import { durationModeKey, intervalModeKey, itemCountModeKey } from "./NewScheduleForm";

export function Schedule({schedule}) {
    if(!schedule)
        return <h1>No schedule selected</h1>

    calculateMissingValue(schedule);

    return (
        <>
            <h1>{schedule.name}</h1>
            <p>{schedule.id}</p>
            <p>{schedule.mode}</p>
            <p>{schedule.itemCount}</p>
            <p>{schedule.duration}</p>
            <p>{schedule.interval}</p>
        </>
    );
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
