import React from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
//import components
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

// APPOINTMENT COMPONENT:
export default function Appointment(props) {
  // MODE VARIABLES
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // SAVE appointment Function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  // DELETE APPOINTMENT:
  function deleteAppointment(id) {
    transition(DELETE, true);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  }

  return (
    <>
      <article className="appointment"></article>
      <Header time={props.time} id={props.id} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={deleteAppointment}
          message={"Are you sure you would like to delete?"}
        />
      )}

      {mode === DELETE && <Status message={"Deleting"} />}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => transition(SHOW)}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
    </>
  );
}
