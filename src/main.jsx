import React from 'react'
import ReactDOM from 'react-dom/client'
import {App, loader as sidebarLoader} from './App.jsx'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import ErrorPage from './ErrorPage.jsx';
import { NewTemplateForm } from './NewTemplateForm.jsx';
import { Template, loader as templateLoader } from './Template.jsx';

import { loadSchedules, loadTemplates, saveTemplates, saveSchedules } from './scheduleIO.js';

async function addTemplate({request}) {
  const formData = await request.formData();
  const newTemp = Object.fromEntries(formData);
  const newTemplate = { id: crypto.randomUUID(), ...newTemp };
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
  let newSchedule = Object.fromEntries(formData);
  newSchedule = { id: crypto.randomUUID(), ...newSchedule };
  const schedules = await loadSchedules();
  await saveSchedules([...schedules, newSchedule]);

  return redirect(`/schedules/${newSchedule.id}`);
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
        element: <p>Select a Template</p>,
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
        element: (<h1>Placeholder</h1>),
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
