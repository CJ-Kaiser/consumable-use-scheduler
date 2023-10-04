import { useState, useEffect } from "react";
import { loadTemplates, saveTemplates } from "./scheduleIO";
import useSkipFirstEffect from "./useSkipFirstEffect";

const useTemplates = () => {
    const [templates, setTemplates] = useState([]);

    async function getTemplates() {
        let templates = await loadTemplates();
        if (!templates) templates = [];
        setTemplates(templates);
    }

    useEffect(() => {
        getTemplates();
    }, []);

    useSkipFirstEffect(() => {
        saveTemplates(templates);
    }, [templates]);

    return [templates, setTemplates];
};

export default useTemplates;