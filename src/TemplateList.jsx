import { TemplateItem } from "./TemplateItem";

export function TemplateList({templates, deleteTemplate, selectTemplate }) {
    return (
        <ul className="list">
            {templates.length === 0 && "No Schedules"}
            {templates.map(t => { 
                return (
                    <TemplateItem
                        {...t}
                        key={t.id}
                        deleteTemplate={deleteTemplate}
                        selectTemplate={selectTemplate}
                    />
                );
            })}
        </ul>
    );
}