import { forwardRef } from "react";
import { Mark } from "./MarkTabs";
import { Badge, Dropdown, Menu } from "antd";
import Style from "./MarkTabsStyle.css";
import { Link, history } from "umi";
import MarkApi from "./MarkApi";
import { MoreOutlined, RightOutlined, CloseCircleOutlined, MinusCircleOutlined, MinusSquareOutlined, CloseOutlined, CaretDownOutlined } from "@ant-design/icons";

export interface MarkTabProps {
  mark: Mark,
  onDelete?: Function,
};

export default forwardRef((props: MarkTabProps, ref) => {

  // --- props

  const { mark, onDelete } = props;

  // --- delete

  const handleDelete = () => {
    MarkApi.deleteMark(mark.docId, () => {
      onDelete?.call(null, mark);
    });
  };

  const displayTitle = (mark: Mark) => {
    if (mark.docTitle && mark.docTitle.length > 0) {
      return mark.docTitle;
    }
    return "untitled";
  };

  // --- pin

  const handlePin = () => {};

  // --- ui more

  const moreMenu = (
    <Menu>
      <Menu.Item key="pin" onClick={handlePin}>Pin</Menu.Item>
      <Menu.Item key="delete" onClick={handleDelete}>Delete</Menu.Item>
    </Menu>
  );

  // --- ui

  return (
    <div className={Style.marks_tabs_item} key={mark.id}>
      <div className={Style.marks_tabs_item_divider}></div>
      {mark.focus && <div className={Style.marks_tabs_item_focus}></div>}
      <Link className={Style.marks_tabs_item_link} to={`/doc/${mark.docId}`}>{displayTitle(mark)}</Link>
      <Dropdown overlay={moreMenu} placement="bottomLeft" trigger={['click']}>
        <div className={Style.nav_new_button}>
          <button className={Style.marks_tabs_item_more}><MoreOutlined /></button>
        </div>
      </Dropdown>
    </div>
  )
});
