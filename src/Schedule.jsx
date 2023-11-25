
import { getSchedule, getTemplate } from "./scheduleIO"
import { useLoaderData } from "react-router-dom";
import { daysToMs, calculateDates} from "./dateUtil";
import { ScheduleDateList } from "./ScheduleDateList";

export async function loader({params}) {
    const schedule = await getSchedule(params.scheduleId);
    const template = await getTemplate(schedule.templateId);
    return {schedule, template};
}

export function Schedule() {
    const {schedule, template} = useLoaderData();

    console.log(schedule);
    console.log(template);
    const parsedDate = new Date(schedule.startDate + " " + schedule.startTime);
    const startMs = parsedDate.getTime();
    const intervalMs = daysToMs(template.interval);

    const dates = calculateDates(startMs, intervalMs, template.itemCount);
    console.log(dates);
    return (
        <div>
            <h1>{schedule.name}</h1>
            <p><b>Template:</b> {template.name}</p>
            <p><b>Item Count:</b> {template.itemCount}</p>
            <ScheduleDateList dates={dates}/>
        </div>
    );
}