export function ButtonListItem({id, label, selected, deleteFunc, selectFunc}) {
    return (
      <li className={selected ? "selected" : ""}>

        <button
          className="btn btn-danger"
          onClick={() => deleteFunc(id)}
        >
          X</button>
        <label
          className="listItemLabel"
          onClick={()=>selectFunc(id)}
        >
          {label}
        </label>
      </li>
    );
}