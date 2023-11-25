import { ScheduleDate } from "./ScheduleDate";

export function ScheduleDateList({dates}){
    return (
        <div>{dates.map(date=> (
                <ScheduleDate key={date.getTime()} date={date}/>
            ))}
        </div>
    );
}