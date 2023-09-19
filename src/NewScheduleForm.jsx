import { useState } from "react";

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

//TODO: Formik for Validation? Refer to project from Ract Basics.
export function NewScheduleForm({onSubmit}) {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [interval, setInterval] = useState("");
    const [itemCount, setItemCount] = useState("");

    const [mode, setMode] = useState(modeOptions[0].value);

    function handleSubmit(e) {
      e.preventDefault();
      if(name === "") return;
      if(duration === NaN || duration <= 0) return;

      onSubmit(name);

      setName("");
      setDuration("");
    };

    const showDurationInput = () => mode != "durationMissing";
    const showIntervalInput = () => mode != "intervalMissing";
    const showItemCountInput = () => mode != "itemCountMissing";

    function validateNumberMax(value, max, setter) {
      value = Math.max(max, value);
      setter(value);
    }

    return (
      <form onSubmit={handleSubmit} className="new-item-form">
        <label htmlFor="title" className="form-input-h">Schedule Name
          <input
            type="text"
            id="title"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <div className="form-sep"></div>
        <label htmlFor="mode" className="form-input-h">Mode
            <select
              id="mode"
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
                value={interval}
                onChange={e=>validateNumberMax(e.target.value, 0, setInterval)}
              />
            </label>
          }
        <button className="btn">Add</button>
      </form>
    );
}