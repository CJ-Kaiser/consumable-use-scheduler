export function ScheduleItem({id, name, deleteSchedule, selectSchedule}) {
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
          {name}
        </label>
      </li>
    );
}