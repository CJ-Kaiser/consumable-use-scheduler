
import { getSchedule } from "./scheduleIO"
import { useLoaderData } from "react-router-dom";

export async function loader({params}) {
    const schedule = await getSchedule(params.scheduleId);
    return {schedule};
}

export function Schedule() {
    const {schedule} = useLoaderData();

    return (
        <div>
            {schedule.name}
        </div>
    );
}