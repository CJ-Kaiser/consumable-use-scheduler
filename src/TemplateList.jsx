import { useState } from "react";
import { ButtonList } from "./ButtonList";
import { useParams } from "react-router-dom";

export function TemplateList({templates}) {
    console.log(templates);
    const {templateId} = useParams();

    var listItems = templates.map(t => {
        return {
            id: t.id,
            label: t.name,
            selected: t.id === templateId,
        }
    });

    return (
        <ButtonList
            listItems={listItems}
            emptyString="No Templates"
            path="/templates"
        />
    );
}