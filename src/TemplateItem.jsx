export function TemplateItem({id, name, deleteTemplate, selectTemplate}) {
    return (
      <li>

        <button
          className="btn btn-danger"
          onClick={() => deleteTemplate(id)}
        >
          X</button>
        <label
          className="listItemLabel"
          onClick={()=>selectTemplate(id)}
        >
          {name}
        </label>
      </li>
    );
}