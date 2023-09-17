import { useState, useEffect } from "react";
import { loadSchedules, saveSchedules } from "./scheduleIO";
import useSkipFirstEffect from "./useSkipFirstEffect";

const useSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    async function getSchedules() {
        let schedules = await loadSchedules();
        if (!schedules) schedules = [];
        setSchedules(schedules);
    }

    useEffect(() => {
        getSchedules();
    }, []);

    useSkipFirstEffect(() => {
        saveSchedules(schedules);
    }, [schedules]);

    return [schedules, setSchedules];
};

export default useSchedules;