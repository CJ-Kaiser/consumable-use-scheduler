import {useState, useEffect} from "react";
import { Form, useLoaderData } from "react-router-dom";
import { loadTemplates } from "./scheduleIO";
import { todayDateString, timeString, daysToMs } from "./dateUtil";
import {ScheduleDate} from "./ScheduleDate"

export async function loader() {
    const templates = await loadTemplates();
    return {templates}
}

export function NewScheduleForm() {
    const {templates} = useLoaderData();

    const [selectedTemplate, setSelectedTemplate] = useState(0);

    const [name, setName] = useState("");
    const [date, setDate] = useState(todayDateString());
    const [time, setTime] = useState(timeString(new Date()));
    const [dateList, setDateList] = useState([]);

    useEffect(() => {
        updateCalculatedSchedule();
    }, [selectedTemplate, date, time]);

    function updateCalculatedSchedule() {
        const template = templates[selectedTemplate];
        const parsedDate = new Date(date + " " + time);
        const startMs = parsedDate.getTime();
        const intervalMs = intervalInMs(template.interval);
        console.log("Template interval:", template.interval);

        console.log("startMs:", startMs);
        console.log("intervalMs:", intervalMs);

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
            <h1>New Schedule</h1>
            <Form method="post" className="vertical-form">
                <label htmlFor="title" className="form-input-h">Schedule Name
                    <input
                    type="text"
                    id="title"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="template" className="form-input-h"> Template
                    <select
                        id="template"
                        name="template"
                        value={selectedTemplate}
                        onChange={e=>setSelectedTemplate(e.target.value)}
                    >
                        {templates.map((template, index)=>(
                            <option value={index} key={template.id}>{template.name}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="startDate"  className="form-input-h"> Start Date
                    <input
                        type="date"
                        id="startDate"
                        value={date}
                        disabled={selectedTemplate === null}
                        onChange={e=>setDate(e.target.value)}
                    />
                </label>
                <label htmlFor="startTime"  className="form-input-h">Start Time
                    <input
                        type="time"
                        id="startTime"
                        value={time}
                        disabled={selectedTemplate === null}
                        onChange={e=>setTime(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    className="btn"
                    disabled={selectedTemplate === null}
                >Add</button>
            </Form>
            <div className="form-sep"></div>
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