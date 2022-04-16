import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Button, Space, Input, Spin } from 'antd';
import BlockApi from './BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, HolderOutlined, LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import MenuIcon from '../icon/MenuIcon';

const { TextArea } = Input;

const spinIcon = <LoadingOutlined spin />;

interface BlockProps {
  data: any,
  showBlock?: boolean,
  focus?: boolean,
  onEnter?: Function,
  onDelete?: Function,
  onMoveUp?: Function,
  onMoveDown?: Function,
  onFocusUp?: Function,
  onFocusDown?: Function,
}

const Block = forwardRef((props: BlockProps, ref) => {

  const [loading, setLoading] = useState<boolean>(false);

  const [text, setText] = useState(props.data.text);

  const [hover, setHover] = useState<boolean>(false);

  const saveBlockChange = (text: string) => {
    BlockApi.updateBlock(props.data.id, { text }, (newBlock: any) => {
    });
  };

  const handleChange = (e: any) => {
    const newText = e.target.value || "";
    saveBlockChange(newText);
    setText(newText);
  };

  const handleMoveUp = () => {
    props.onMoveUp?.call(null, props.data);
  };

  const handleMoveDown = () => {
    props.onMoveDown?.call(null, props.data);
  };

  const handleEnter = (e: any) => {
    e.preventDefault();
    props.onEnter?.call(null, props.data);
  };

  const isFocusUp = (e: any) => {
    if (e.key == "ArrowUp" && e.target.selectionStart == 0) {
      props.onFocusUp?.call(null, props.data);
    }
  };

  const isFocusDown = (e: any) => {
    if (e.key == "ArrowDown" && e.target.selectionStart == e.target.value.length) {
      props.onFocusDown?.call(null, props.data);
    }
  };

  const handlePress = (e: any) => {
    isFocusUp(e);
    isFocusDown(e);
    setHover(false);
    if (e.key == "Backspace" && e.metaKey) {
      setLoading(true);
      props.onDelete?.call(null, props.data); 
    }
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (props.focus && inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      });
    }
  }, [props.focus]);

  const menu = (
    <Menu>
      <Menu.Item key={`${props.data.id}-edit`}><LinkOutlined /></Menu.Item>
      <Menu.Item key={`${props.data.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${props.data.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
    }}>
    <div
      style={{
        position: "relative",
        visibility: hover ? "visible" : "hidden",
      }}>
      <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined/></Button>
      </Dropdown>
    </div>
    <div
      style={{
        borderRadius: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        flexGrow: 1,
      }}>
      <TextArea 
        ref={inputRef}
        placeholder="" 
        autoSize 
        value={text}
        size="middle"
        bordered={false}
        onChange={handleChange}
        onBlur={handleChange}
        onPressEnter={handleEnter}
        onKeyDown={handlePress}
        />
    </div>
  </div>
  </>
});

export default Block;
