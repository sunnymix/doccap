import { forwardRef, useEffect, useState } from "react";
import Week from "./Week";
import { Space, InputNumber, Checkbox } from "antd";

export interface WeekListProps {};

export default forwardRef((props: WeekListProps, ref) => {

  // --- weeks

  const [weeks, setWeeks] = useState<number[]>([]);

  // --- weeks before

  const [weeksBefore, setWeeksBefore] = useState<number>(1);

  const handleWeeksBeforeUpdate = (value: number) => {
    setWeeksBefore(value);
  };

  // --- weeks after

  const [weeksAfter, setWeeksAfter] = useState<number>(1);

  const handleWeeksAfterUpdate = (value: number) => {
    setWeeksAfter(value);
  };

  // --- weeks update

  useEffect(() => {
    const today = 0;
    const weeks = [today];
    for (var i = 1; i <= weeksBefore; i++) {
      weeks.splice(0, 0, today - i);
    }
    for (var i = 1; i <= weeksAfter; i++) {
      weeks.push(today + i);
    }
    setWeeks(weeks);
  }, [weeksBefore, weeksAfter]);

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
        min={0}
        value={weeksBefore}
        onChange={handleWeeksBeforeUpdate}
        addonAfter="周前"
        style={{
          width: 110,
        }}/>
      <InputNumber
        min={0}
        value={weeksAfter}
        onChange={handleWeeksAfterUpdate}
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
