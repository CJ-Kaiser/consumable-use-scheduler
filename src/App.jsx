import { useState, useEffect } from "react";
import "./styles.css"
import { NewScheduleForm } from "./NewScheduleForm";
import { ScheduleList } from "./ScheduleList";

export default function App() {
  const [Schedules, setSchedules] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if(localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(Schedules))
  }, [Schedules]);

  function addSchedule(title) {
    setSchedules(currentSchedules => {
      return [
        ...currentSchedules,
        {id: crypto.randomUUID(), title, completed: false}
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
  }

  return (
    <>
      <NewScheduleForm onSubmit={addSchedule}/>
      <h1 className="header">Schedule List</h1>
      <ScheduleList
        Schedules={Schedules}
        deleteSchedule={deleteSchedule}
      />
    </>
  );
}