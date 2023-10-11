import { ButtonList } from "./ButtonList";

export function TemplateList({templates, selectedID, deleteTemplate, selectTemplate }) {
    var listItems = templates.map(t => {
        return {
            id: t.id,
            label: t.name,
            selected: t.id===selectedID,
        }
    });

    return (
        <ButtonList
            listItems={listItems}
            emptyString="No Templates"
            deleteFunc={deleteTemplate}
            selectFunc={selectTemplate}
        />
    );
}