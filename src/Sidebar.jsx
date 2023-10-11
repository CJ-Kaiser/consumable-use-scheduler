import { useState } from "react";
import { TemplateList } from "./TemplateList";

const tabs = ["Templates", "Schedules"];

export function Sidebar({templateData}) {
    const [tab, setTab] = useState(tabs[0]);

    function tabClicked(clickedTab) {
        setTab(clickedTab);
    }

    return (
        <section className="sidebar">
            <div className="tabs">
                {tabs.map(t => (
                    <button
                    key={t}
                    className={"btn tab " + (t==tab ? "activeTab" : "")}
                    onClick={()=>tabClicked(t)}
                    >{t}</button>
                    ))}
            </div>
            <h2>{tab}</h2>
            {tab === tabs[0] && 
                <TemplateList
                    templates={templateData.templates}
                    selectedID={templateData.selectedID}
                    deleteTemplate={templateData.delete}
                    selectTemplate={templateData.select}
                />
            }
        </section>
    );
}