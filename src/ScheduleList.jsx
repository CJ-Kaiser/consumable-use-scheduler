import { ScheduleItem } from "./ScheduleItem";

export function ScheduleList({ Schedules, deleteSchedule, selectSchedule }) {
    return (
        <ul className="list">
            {Schedules.length === 0 && "No Schedules"}
            {Schedules.map(Schedule => { 
                return (
                    <ScheduleItem
                        {...Schedule}
                        key={Schedule.id}
                        deleteSchedule={deleteSchedule}
                        selectSchedule={selectSchedule}
                    />
                );
            })}
        </ul>
    );
}