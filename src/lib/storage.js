const STORAGE_KEY = "scheduler_data";

const seedData = {
  days: [
    { id: 1, name: "Monday", appointments: [1, 2, 3, 4, 5], interviewers: [1, 2, 3, 4, 5], spots: 2 },
    { id: 2, name: "Tuesday", appointments: [6, 7, 8, 9, 10], interviewers: [1, 2, 3, 4, 5], spots: 2 },
    { id: 3, name: "Wednesday", appointments: [11, 12, 13, 14, 15], interviewers: [1, 2, 3, 4, 5], spots: 3 },
    { id: 4, name: "Thursday", appointments: [16, 17, 18, 19, 20], interviewers: [1, 2, 3, 4, 5], spots: 2 },
    { id: 5, name: "Friday", appointments: [21, 22, 23, 24, 25], interviewers: [1, 2, 3, 4, 5], spots: 4 },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: { student: "Archie Cohen", interviewer: 2 } },
    3: { id: 3, time: "2pm", interview: null },
    4: { id: 4, time: "3pm", interview: { student: "Leopold Silvers", interviewer: 4 } },
    5: { id: 5, time: "4pm", interview: null },
    6: { id: 6, time: "12pm", interview: null },
    7: { id: 7, time: "1pm", interview: null },
    8: { id: 8, time: "2pm", interview: { student: "Lydia Miller-Jones", interviewer: 1 } },
    9: { id: 9, time: "3pm", interview: null },
    10: { id: 10, time: "4pm", interview: null },
    11: { id: 11, time: "12pm", interview: null },
    12: { id: 12, time: "1pm", interview: null },
    13: { id: 13, time: "2pm", interview: null },
    14: { id: 14, time: "3pm", interview: null },
    15: { id: 15, time: "4pm", interview: null },
    16: { id: 16, time: "12pm", interview: null },
    17: { id: 17, time: "1pm", interview: { student: "Maria Boucher", interviewer: 3 } },
    18: { id: 18, time: "2pm", interview: null },
    19: { id: 19, time: "3pm", interview: null },
    20: { id: 20, time: "4pm", interview: null },
    21: { id: 21, time: "12pm", interview: null },
    22: { id: 22, time: "1pm", interview: null },
    23: { id: 23, time: "2pm", interview: null },
    24: { id: 24, time: "3pm", interview: null },
    25: { id: 25, time: "4pm", interview: null },
  },
  interviewers: {
    1: { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    2: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    3: { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    4: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    5: { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
  },
};

function getStored() {
  try {
    const raw = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (_) {
    // ignore
  }
  return null;
}

function saveStored(data) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (_) {
    // ignore
  }
}

export function loadData() {
  const stored = getStored();
  if (stored && stored.days && stored.appointments && stored.interviewers) {
    return stored;
  }
  saveStored(seedData);
  return seedData;
}

export function saveData(data) {
  saveStored(data);
}

export function clearData() {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (_) {
    // ignore
  }
}
