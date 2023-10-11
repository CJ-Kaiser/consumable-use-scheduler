import { useState, useEffect } from "react";
import "./styles.css"
import useTemplates from "./useTemplates";
import { Template } from "./Template";
import { Sidebar } from "./Sidebar";

export default function App() {
  const [templates, setTemplates] = useTemplates();
  const [selected, setSelected] = useState(null);

  function addTemplate(templateData) {
    const newTemplate = {id: crypto.randomUUID(), ...templateData};
    console.log(newTemplate);
    setTemplates(currentTemplates => {
      return [
        ...currentTemplates,
        newTemplate
      ]
    });
  }

  function deleteTemplate(id) {
    setTemplates(currentTemplates => {
      return currentTemplates.filter(template => template.id !== id);
    });

    if(selected.id == id)
      setSelected(null);
  }

  function selectTemplate(id) {
    let template = templates.find(s => s.id == id);
    if(template !== undefined)
      setSelected(template);
  }

  return (
    <>
      <Sidebar 
      templateData={{
        templates: templates,
        selectedID: selected==null ? "" : selected.id,
        delete: deleteTemplate,
        select: selectTemplate,
      }}/>
      <div className="content">
        <Template template={selected} addTemplate={addTemplate}/>
      </div>
    </>
  );
}