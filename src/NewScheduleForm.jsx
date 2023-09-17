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

export function NewScheduleForm({onSubmit}) {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [interval, setInterval] = useState("");
    const [itemCount, setItemCount] = useState("");

    const [mode, setMode] = useState(modeOptions[0].value);

    function handleSubmit(e) {
      e.preventDefault();
      if(name === "") return;
      if(time === NaN || time <= 0) return;

      onSubmit(name);

      setName("");
      setTime("");
    };

    const showDurationInput = () => mode != "durationMissing";
    const showIntervalInput = () => mode != "intervalMissing";
    const showItemCountInput = () => mode != "itemCountMissing";

    return (
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="title">Schedule Name</label>
          <input
            type="text"
            id="title"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="mode">Mode
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
          {showDurationInput() &&
            <label htmlFor="time">Duration
              <input
                type="number"
                id="time"
                value={time}
                onChange={e=>setTime(e.target.value)}
              />
            </label>
          }
          {showIntervalInput() &&
            <label htmlFor="interval">Interval
              <input
                type="number"
                id="interval"
                value={interval}
                onChange={e=>setTime(e.target.value)}
              />
            </label>
          }
          {showItemCountInput() && 
            <label htmlFor="itemCount">Item Count
              <input
                type="number"
                id="itemCount"
                value={itemCount}
                onChange={e=>setTime(e.target.value)}
              />
            </label>
          }
        </div>
        <button className="btn">Add</button>
      </form>
    );
}