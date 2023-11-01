import {useState} from "react";
import { Form, useLoaderData } from "react-router-dom";
import { loadTemplates } from "./scheduleIO";

export async function loader() {
    const templates = await loadTemplates();
    return {templates}
}

export function NewScheduleForm() {
    const {templates} = useLoaderData();

    const [selectedTemplate, setSelectedTemplate] = useState("");

    return (
        <>
            <h1>New Schedule</h1>
            <Form method="post" className="vertical-form">
                <label htmlFor="template">
                    <select
                        id="template"
                        name="template"
                        value={selectedTemplate}
                        onChange={e=>setSelectedTemplate(e.target.value.id)}
                    >
                        
                    </select>
                </label>
            </Form>
        </>
    );
}