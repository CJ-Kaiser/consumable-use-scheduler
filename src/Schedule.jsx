import { useEffect, useState } from "react";
import { durationModeKey, intervalModeKey, itemCountModeKey } from "./NewScheduleForm";
import { todayDateString, timeString, daysToMs} from "./dateUtil";
import { ScheduleDate } from "./ScheduleDate";

export function Schedule({schedule}) {
    const [date, setDate] = useState(todayDateString());
    const [time, setTime] = useState(timeString(new Date()));
    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        setScheduleList([]);
    }, [schedule]);

    if(!schedule)
        return <h1>No schedule selected</h1>

    calculateMissingValue(schedule);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(date);

        const parsedDate = new Date(date + " " + time);
        const startMs = parsedDate.getTime();
        const intervalMs = intervalInMs(schedule.interval);

        const dates = [];
        for(let i=0; i< schedule.itemCount; i++)
        {
            let ms = startMs + intervalMs * i;
            dates.push(new Date(ms));
        }

        setScheduleList(dates);
    }

    return (
        <>
            <p>-   -   -    -   -</p>
            <h1>{schedule.name}</h1>
            <p><b>Mode:</b> {schedule.mode}</p>
            <p><b>Item count:</b> {schedule.itemCount}</p>
            <p><b>Duration (days)</b>: {schedule.duration}</p>
            <p><b>Interval (days)</b>: {schedule.interval}</p>
            <p>-   -   -    -   -</p>
            <form onSubmit={handleSubmit} className="vertical-form">
                <label htmlFor="startDate"  className="form-input-h"> Start Date
                    <input
                        type="date"
                        id="startDate"
                        value={date}
                        onChange={e=>setDate(e.target.value)}
                    />
                </label>
                <label htmlFor="startTime"  className="form-input-h">Start Time
                    <input
                        type="time"
                        id="startTime"
                        value={time}
                        onChange={e=>setTime(e.target.value)}
                    />
                </label>
                <button className="btn">Calculate</button>
            </form>
            <div>{scheduleList.map(date=> (
                <ScheduleDate key={date.getTime()} date={date}/>
            ))}
            </div>
        </>
    );
}

function intervalInMs(interval) {
    return daysToMs(interval);
}

function calculateMissingValue(schedule) {
    switch (schedule.mode) {
        case durationModeKey:
            schedule.duration = schedule.interval * schedule.itemCount;
            break;
        case intervalModeKey:
            schedule.interval = schedule.duration / schedule.itemCount;
            break;
        case itemCountModeKey:
            schedule.itemCount = Math.floor(schedule.duration / schedule.interval);
        default:
            break;
    }
}
