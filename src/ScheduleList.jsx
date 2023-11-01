import { ButtonList } from "./ButtonList";
import { useParams } from "react-router-dom";


export function ScheduleList({ schedules }) {
    const { scheduleId } = useParams();

    var listItems = schedules.map(t => {
        return {
            id: t.id,
            label: t.name,
            selected: t.id === scheduleId,
        };
    });

    return (
        <ButtonList
            listItems={listItems}
            emptyString="No Schedules"
            path="/schedules" />
    );
}
