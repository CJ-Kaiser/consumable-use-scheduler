import localforage from "localforage";

const forageKey = "widgetSchedules";

export async function loadTemplates() {
    return await localforage.getItem(forageKey);
}

export async function saveTemplates(schedules) {
    return await localforage.setItem(forageKey, schedules);
}