import React from 'react'
import ReactDOM from 'react-dom/client'
import {App, loader as sidebarLoader} from './App.jsx'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import { NewTemplateForm, calculateMissingValue} from './NewTemplateForm.jsx';
import { NewScheduleForm, loader as scheduleFormLoader } from './NewScheduleForm.jsx';
import { Template, loader as templateLoader } from './Template.jsx';
import {Schedule, loader as scheduleLoader} from './Schedule.jsx';

import { loadSchedules, loadTemplates, saveTemplates, saveSchedules } from './scheduleIO.js';

async function addTemplate({request}) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);
  const newTemplate = { id: crypto.randomUUID(), ...formObject };
  calculateMissingValue(newTemplate);
  const templates = await loadTemplates();
  await saveTemplates([...templates, newTemplate]);

  return redirect(`/templates/${newTemplate.id}`);
}

async function deleteTemplate({params}) {
  const id = params.templateId;
  const templates = await loadTemplates();
  const withDeletion = templates.filter(template => template.id !== id);
  await saveTemplates(withDeletion);
  return redirect("/templates")
}

async function addSchedule({request}) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);
  const templates = await loadTemplates();
  const template = templates[formObject.template];
  const newSchedule = {
    id: crypto.randomUUID(),
    templateId: template.id,
    name: formObject.name,
    startDate: formObject.startDate,
    startTime: formObject.startTime,
  };
  const schedules = await loadSchedules();
  await saveSchedules([...schedules, newSchedule]);

  return redirect(`/schedules/${newSchedule.id}`);
}

async function deleteSchedule({params}) {
  const id = params.scheduleId;
  const schedules = await loadSchedules();
  const withDeletion = schedules.filter(s => s.id !== id);
  await saveSchedules(withDeletion);
  return redirect("/schedules")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    loader: sidebarLoader,
    children: [
      {
        path: "templates",
        element: <p>Select a template or create a new one</p>,
      },
      {
        path: "templates/:templateId",
        element: <Template/>,
        loader: templateLoader,
      },
      {
        path: "templates/new",
        element: <NewTemplateForm/>,
        action: addTemplate,
      },
      {
        path:"templates/:templateId/delete",
        element: <h1>Deleting</h1>,
        loader: deleteTemplate,
      },
      {
        path: "schedules",
        element: <h1>Select a schedule or create a new one</h1>,
      },
      {
        path: "schedules/:scheduleId",
        element: <Schedule/>,
        loader: scheduleLoader,
      },
      {
        path: "schedules/new",
        element: <NewScheduleForm/>,
        loader: scheduleFormLoader,
        action: addSchedule,
      },
      {
        path: "schedules/:scheduleId/delete",
        element: <p>Deleting</p>,
        loader: deleteSchedule,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
