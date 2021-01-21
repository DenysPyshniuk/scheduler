import React, { useEffect, useState } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";

import "components/Application.scss";



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Denys Pyshniuk",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
    },
  },
];

export default function Application(props) {
  const [state, setDays] = useState({
    day: "Monday",
    days: [],
    appointments: {}
});
  //renders data for days (nav bar)
  useEffect(() => {
    axios.get("/api/days").then(response => {
        setDays(response.data)
    });
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDays} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment} />;
        })}
      </section>
    </main>
  );
}
