import { useState, useEffect } from "react";
import "./styles.css"
import { NewScheduleForm } from "./NewScheduleForm";
import { ScheduleList } from "./ScheduleList";
import useSchedules from "./useSchedules";

export default function App() {
  const [schedules, setSchedules] = useSchedules();

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
  }

  return (
    <>
      <NewScheduleForm onSubmit={addSchedule}/>
      <h1 className="header">Schedule List</h1>
      <ScheduleList
        Schedules={schedules}
        deleteSchedule={deleteSchedule}
      />

    </>
  );
}