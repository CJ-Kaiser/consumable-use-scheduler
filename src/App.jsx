import { useState, useEffect } from "react";
import "./styles.css"
import { NewScheduleForm } from "./NewScheduleForm";
import { ScheduleList } from "./ScheduleList";
import useSchedules from "./useSchedules";
import { Schedule } from "./Schedule";

export default function App() {
  const [schedules, setSchedules] = useSchedules();
  const [selected, setSelected] = useState(null);

  function addSchedule(title) {
    setSchedules(currentSchedules => {
      return [
        ...currentSchedules,
        {id: crypto.randomUUID(), title}
      ]
    });
  }

  function toggleSchedule(id, completed) {
    setSchedules(currentSchedules => {
      return currentSchedules.map(Schedule => {
        if(Schedule.id == id)
          return {...Schedule, completed}

        return Schedule;
      });
    });
  }

  function deleteSchedule(id) {
    setSchedules(currentSchedules => {
      return currentSchedules.filter(Schedule => Schedule.id !== id);
    });

    if(selected.id == id)
      setSelected(null);
  }

  function selectSchedule(id) {
    let schedule = schedules.find(s => s.id == id);
    if(schedule !== undefined)
      setSelected(schedule);
  }

  return (
    <>
      <NewScheduleForm onSubmit={addSchedule}/>
      <h1 className="header">Schedule List</h1>
      <ScheduleList
        Schedules={schedules}
        deleteSchedule={deleteSchedule}
        selectSchedule={selectSchedule}
      />
      <Schedule schedule={selected}/>
    </>
  );
}