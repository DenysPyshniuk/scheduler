import { useState, useEffect } from "react";
import { loadData, saveData } from "lib/storage";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const { days, appointments, interviewers } = loadData();
    setState((prev) => ({
      ...prev,
      days,
      appointments,
      interviewers,
    }));
  }, []);

  function persist(nextState) {
    saveData({
      days: nextState.days,
      appointments: nextState.appointments,
      interviewers: nextState.interviewers,
    });
  }

  function bookInterview(id, interview) {
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (
        day.name === foundDay.name &&
        state.appointments[id].interview === null
      ) {
        return { ...day, spots: day.spots - 1 };
      }
      return day;
    });

    const nextState = { ...state, appointments, days };
    setState(nextState);
    try {
      persist(nextState);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function cancelInterview(id) {
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      }
      return day;
    });

    const nextState = { ...state, appointments, days };
    setState(nextState);
    try {
      persist(nextState);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  return { cancelInterview, setDay, state, bookInterview };
};

export default useApplicationData;
