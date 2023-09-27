
const localOptions = { hour: "numeric", minute: "2-digit" };

export function ScheduleDate({date}) {

    function timeString(d) {
        return d.toLocaleTimeString([], localOptions);
    }

    return (
        <p>
            {`${date.toDateString()} ${timeString(date)}`}
        </p>
    );
}