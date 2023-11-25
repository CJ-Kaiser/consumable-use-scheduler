import localforage from "localforage";

const templateKey = "kTemplates";
const scheduleKey = "kSchedules";

export async function loadTemplates() {
    const templates = await loadData(templateKey);
    if(!templates)
        return[];

    return templates;
}

export async function getTemplate(id){
    const templates = await loadTemplates();
    let template = templates.find(t => t.id == id);
    return template ?? null;
}

export async function saveTemplates(templates) {
    console.log("saving", templates);
    return await setData(templateKey, templates);
}

export async function loadSchedules(){
    const schedules = await loadData(scheduleKey);
    if(!schedules)
        return [];

    return schedules;
}

export async function getSchedule(id){
    const schedules = await loadSchedules();
    let schedule = schedules.find(s => s.id == id);
    return schedule ?? null;
}

export async function saveSchedules(schedules) {
    return await setData(scheduleKey, schedules);
}


async function loadData(key) {
    return await localforage.getItem(key);
}

async function setData(key, data){
    return await localforage.setItem(key, data);
}