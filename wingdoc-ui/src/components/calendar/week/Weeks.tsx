import { forwardRef, useState } from "react";
import Week from "./Week";
import { Space, InputNumber, Checkbox } from "antd";

export interface WeekListProps {};

export default forwardRef((props: WeekListProps, ref) => {

  const [weeks, setWeeks] = useState<number[]>([-1, 0, 1]);

  return <>
  <Space 
    direction="vertical"
    size="middle"
    style={{
      width: "100%",
      padding: 0,
    }}>
    <Space direction="horizontal" size="middle">
      <InputNumber
        defaultValue={1}
        addonAfter="周前"
        style={{
          width: 110,
        }}/>
      <InputNumber
        defaultValue={1}
        addonAfter="周后"
        style={{
          width: 110,
        }}/>
      <InputNumber
        defaultValue={1}
        addonAfter="高度"
        style={{
          width: 110,
        }}/>
      <Checkbox
        defaultChecked={true}>周末</Checkbox>
    </Space>
    <div
      style={{
        borderBottom: "1px solid #ddd",
      }}>
        {weeks.map((week: number) => 
        <Week
          key={week}
          week={week}
          style={{
            marginBottom: 0,
          }}/>
        )}
    </div>
  </Space>
  </>
});
