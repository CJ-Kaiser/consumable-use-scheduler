export function ScheduleItem({id, title, deleteSchedule, selectSchedule}) {
    return (
      <li>

        <button
          className="btn btn-danger"
          onClick={() => deleteSchedule(id)}
        >
          X</button>
        <label
          className="listItemLabel"
          onClick={()=>selectSchedule(id)}
        >
          {title}
        </label>
      </li>
    );
}