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

  function updateSpots(days, appointments) {
    return days.map((day) => {
      const spots = day.appointments.reduce((count, id) => {
        return appointments[id].interview ? count : count + 1;
      }, 0);
      return { ...day, spots };
    });
  }

  useEffect(() => {
    const { days, appointments, interviewers } = loadData();
    const daysWithSpots = updateSpots(days, appointments);
    setState((prev) => ({
      ...prev,
      days: daysWithSpots,
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.days, appointments);

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
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.days, appointments);

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
