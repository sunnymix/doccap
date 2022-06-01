import { forwardRef, useEffect, useState } from "react";
import Week from "./Week";
import { Space, InputNumber, Checkbox } from "antd";
import "./WeekStyle.css";

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

  const [weeksAfter, setWeeksAfter] = useState<number>(4);

  const handleWeeksAfterUpdate = (value: number) => {
    setWeeksAfter(value);
  };

  // --- weekend show

  const [weekendShow, setWeekendShow] = useState<boolean>(true);

  const handleWeekendShowUpdate = (e: any) => {
    const checked = e.target.checked;
    setWeekendShow(checked);
  };

  // --- height multiple

  const [heightMultiple, setHeightMultipel] = useState<number>(1);

  const handleHeightMultipleUpdate = (value: number) => {
    setHeightMultipel(value);
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
  }, [weeksBefore, weeksAfter, weekendShow]);

  // --- ui

  return <>
  <Space className="weeks" direction="vertical" size="middle">
    <Space direction="horizontal" size="middle">
      <InputNumber className='weeks_input' min={0} value={weeksBefore} onChange={handleWeeksBeforeUpdate} addonAfter="周前" />
      <InputNumber className='weeks_input' min={0} value={weeksAfter} onChange={handleWeeksAfterUpdate} addonAfter="周后" />
      <InputNumber className='weeks_input' value={heightMultiple} onChange={handleHeightMultipleUpdate} addonAfter="空间" />
      <Checkbox defaultChecked={weekendShow} onChange={handleWeekendShowUpdate}>周末</Checkbox>
    </Space>
    <div className="weeks_body">
      {weeks.map((week: number) => 
        <Week key={week} week={week} weekendShow={weekendShow} heightMultiple={heightMultiple} />
      )}
    </div>
  </Space>
  </>
});
