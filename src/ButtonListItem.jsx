import { Link } from "react-router-dom";

export function ButtonListItem({id, label, selected, path}) {
    return (
      <li className={selected ? "selected" : ""}>

        <Link
          className="btn btn-danger"
          to={path+ "/" + id + "/delete"}
        >
          X</Link>
        <Link
          className="listItemLabel"
          to={path + "/" + id}
        >
          {label}
        </Link>
      </li>
    );
}