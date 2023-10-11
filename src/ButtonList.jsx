import { ButtonListItem } from "./ButtonListItem";

export function ButtonList({listItems, emptyString, deleteFunc, selectFunc }) {
    return (
        <ul className="list">
            {listItems.length === 0 && emptyString}
            {listItems.map(t => {
                return (
                    <ButtonListItem
                        {...t}
                        key={t.id}
                        deleteFunc={deleteFunc}
                        selectFunc={selectFunc}
                    />
                );
            })}
        </ul>
    );
}