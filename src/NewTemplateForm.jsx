import { useState } from "react";
import { Form } from "react-router-dom";


const modeOptions = [
  {
    value:"durationMissing",
    text:"Calculate Duration"
  },
  {
    value:"intervalMissing",
    text:"Calculate Interval"
  },
  {
    value:"itemCountMissing",
    text:"Calculate Item Count"
  }
];

export const durationModeKey = modeOptions[0].value;
export const intervalModeKey = modeOptions[1].value;
export const itemCountModeKey = modeOptions[2].value;

//TODO: Use Formik? And Yup for validation? Refer to project from React Basics.
export function NewTemplateForm({onSubmit}) {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [interval, setInterval] = useState("");
    const [itemCount, setItemCount] = useState("");

    const [mode, setMode] = useState(modeOptions[0].value);

    function handleSubmit(e) {
      e.preventDefault();
      if(name === "") return;

      const data = {
        name: name,
        mode: mode,
        itemCount: itemCount,
        duration: duration,
        interval: interval,
      };

      onSubmit(data);

      setName("");
      setDuration("");
      setInterval("");
      setItemCount("");
    };

    const showDurationInput = () => mode != modeOptions[0].value;
    const showIntervalInput = () => mode != modeOptions[1].value;
    const showItemCountInput = () => mode != modeOptions[2].value;

    function validateNumberMax(value, max, setter) {
      if(value == "") {
        setter(value);
        return;
      }

      value = Math.max(max, value);
      setter(value);
    }

    return (
      <>
        <h1>New Template</h1>
        <Form method="post" className="vertical-form">
          <label htmlFor="title" className="form-input-h">Template Name
            <input
              type="text"
              id="title"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <div className="form-sep-invis"></div>
          <label htmlFor="mode" className="form-input-h">Mode
              <select
                id="mode"
                name="mode"
                value={mode}
                onChange={e=>setMode(e.target.value)}
              >
                {modeOptions.map((option)=>(
                  <option value={option.value} key={option.value}>{option.text}</option>
                ))}
              </select>
          </label>
            {showItemCountInput() &&
              <label htmlFor="itemCount" className="form-input-h">Item Count
                <input
                  type="number"
                  id="itemCount"
                  name="itemCount"
                  value={itemCount}
                  onChange={e=>validateNumberMax(e.target.value, 1, setItemCount)}
                />
              </label>
            }
            {showDurationInput() &&
              <label htmlFor="time" className="form-input-h">Duration
                <input
                  type="number"
                  id="time"
                  name="duration"
                  value={duration}
                  onChange={e=>validateNumberMax(e.target.value, 1, setDuration)}
                />
              </label>
            }
            {showIntervalInput() &&
              <label htmlFor="interval" className="form-input-h">Interval
                <input
                  type="number"
                  id="interval"
                  name="interval"
                  value={interval}
                  onChange={e=>validateNumberMax(e.target.value, 0, setInterval)}
                />
              </label>
            }
            <div className="form-sep-invis"></div>
          <button type="submit" className="btn">Add</button>
          <div className="form-sep"></div>
        </Form>
      </>
    );
}

export function calculateMissingValue(template) {
  switch (template.mode) {
      case durationModeKey:
          template.duration = template.interval * template.itemCount;
          break;
      case intervalModeKey:
          template.interval = template.duration / template.itemCount;
          break;
      case itemCountModeKey:
          template.itemCount = Math.floor(template.duration / template.interval);
      default:
          break;
  }
}