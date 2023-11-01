
import { getSchedule } from "./scheduleIO"

export async function loader({params}) {
    const schedule = await getSchedule(params.scheduleId);
    return {schedule};
}

export function Schedule() {
    const {schedule} = useLoaderData();

    return (
        <div>
            {schedule.map(s=> (
                <ScheduleDate key={s.date.getTime()} date={s.date}/>
            ))
        }
        </div>
    );
}