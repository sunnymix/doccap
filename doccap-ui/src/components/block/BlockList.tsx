import { FC, useEffect, useState } from 'react';
import BlockApi from './BlockApi';
import { Space, Spin, Button, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockInfo from './BlockInfo';

const spinIcon = <LoadingOutlined spin />;

const BlockList: FC<{
  docId: string,
  showBlock?: boolean,
}> = ({
  docId,
  showBlock
}) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [blocks, setBlocks] = useState<any[]>([]);

  const searchBlocks = () => {
    setLoading(true);
    BlockApi.getBlockListOfDoc(docId, (blocks: any) => {
      setLoading(false);
      setBlocks(blocks);
    });
  };

  useEffect(() => {
    searchBlocks();
  }, []);

  const handleAdd = () => {
    BlockApi.addBlockToDoc(docId, { text: "" }, (newBlock: any) => {
      const newBlocks: any[] = [];
      blocks.forEach((block: any) => {
        newBlocks.push(block);
      });
      newBlocks.push(newBlock);
      setBlocks(newBlocks);
    });
  };
  
  return <>
  {/* <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/> */}
  <div style={{ padding: 2 }}>
    <Space direction="vertical" size="small" style={{width: "100%"}}>
      {blocks.map((block: any) => <BlockInfo key={block.id} block={block} showBlock={showBlock} />)}
      <Divider/>
      <Button type="link" onClick={handleAdd}>Add</Button>
    </Space>
  </div>
  </>
};

export default BlockList;
