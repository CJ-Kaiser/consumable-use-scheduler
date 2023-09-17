export function ScheduleItem({id, title, deleteSchedule}) {
    return (
      <li>

        <button
          className="btn btn-danger"
          onClick={() => deleteSchedule(id)}
        >
          X</button>
        <label
          className="listItemLabel"
        >
          {title}
        </label>
      </li>
    );
}