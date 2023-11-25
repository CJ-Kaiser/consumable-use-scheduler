import { useState } from "react";
import { TemplateList } from "./TemplateList";
import { Link } from "react-router-dom";
import { ScheduleList } from "./ScheduleList";

const tabs = [
    {
        path:"templates",
        text:"Templates",
    },
    {
        path: "schedules",
        text: "Schedules",
    }
];

export function Sidebar({templates, schedules}) {
    const [tab, setTab] = useState(tabs[0]);

    function tabClicked(clickedTab) {
        setTab(clickedTab);
    }

    let renderedTab;
    if(tab.text == "Templates")
        renderedTab = <TemplateList templates={templates}/>
    else if(tab.text == "Schedules")
        renderedTab = <ScheduleList schedules={schedules}/>

    return (
        <section className="sidebar">
            <div className="tabs">
                {tabs.map(t => (
                    <Link
                    to={t.path}
                    key={t.path}
                    className={"btn tab " + (t.text==tab.text ? "activeTab" : "")}
                    onClick={()=>tabClicked(t)}
                    >{t.text}</Link>
                    ))}
            </div>
            <h2>{tab.text}</h2>
            {renderedTab}
        </section>
    );
}