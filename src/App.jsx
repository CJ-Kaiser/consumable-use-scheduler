import { useState, useEffect } from "react";
import "./styles.css"
import useTemplates from "./useTemplates";
import { Template } from "./Template";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { loadTemplates, loadSchedules} from "./scheduleIO";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  let templates = await loadTemplates();
  let schedules = await loadSchedules();
  if(!templates)
      templates = [];
  if(!schedules)
    schedules = [];
  return {templates, schedules};
}

export function App() {
  const {templates, schedules} = useLoaderData();

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
        templates={templates}
        schedules={schedules}
      />
      <div className="content">
        <Outlet/>
        {/* <Template template={selected} addTemplate={addTemplate}/> */}
      </div>
    </>
  );
}