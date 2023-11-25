import { useEffect, useState } from "react";
import { durationModeKey, intervalModeKey, itemCountModeKey } from "./NewTemplateForm";
import { todayDateString, timeString, daysToMs} from "./dateUtil";
import { ScheduleDate } from "./ScheduleDate";
import { getTemplate } from "./scheduleIO";
import { useLoaderData } from "react-router-dom";

export async function loader({params}) {
    console.log(params.templateId);
    const template = await getTemplate(params.templateId);
    return {template};
}

export function Template() {
    const [date, setDate] = useState(todayDateString());
    const [time, setTime] = useState(timeString(new Date()));
    const [dateList, setDateList] = useState([]);
    const {template} = useLoaderData();

    useEffect(() => {
        setDateList([]);
    }, [template]);

    calculateMissingValue(template);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(date);

        const parsedDate = new Date(date + " " + time);
        const startMs = parsedDate.getTime();
        const intervalMs = intervalInMs(template.interval);

        const dates = [];
        for(let i=0; i< template.itemCount; i++)
        {
            let ms = startMs + intervalMs * i;
            dates.push(new Date(ms));
        }

        setDateList(dates);
    }

    return (
        <>
            <h1>{template.name}</h1>
            <p><b>Mode:</b> {template.mode}</p>
            <p><b>Item count:</b> {template.itemCount}</p>
            <p><b>Duration (days)</b>: {template.duration}</p>
            <p><b>Interval (days)</b>: {template.interval}</p>
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
                <button className="btn">Preview Schedule</button>
            </form>
            <div>{dateList.map(date=> (
                <ScheduleDate key={date.getTime()} date={date}/>
            ))}
            </div>
        </>
    );
}

function intervalInMs(interval) {
    return daysToMs(interval);
}

function calculateMissingValue(template) {
    switch (template.mode) {
        case durationModeKey:
            template.duration = template.interval * template.itemCount;
            break;
        case intervalModeKey:
            template.interval = template.duration / template.itemCount;
            break;
        case itemCountModeKey:
            template.itemCount = Math.floor(template.duration / template.interval);
        default:
            break;
    }
}
