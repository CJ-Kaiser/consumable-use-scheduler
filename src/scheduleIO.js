import localforage from "localforage";

const forageKey = "widgetSchedules";

export async function loadSchedules() {
    return await localforage.getItem(forageKey);
}

export async function saveSchedules(schedules) {
    return await localforage.setItem(forageKey, schedules);
}