import React from "react";
import {
  render,
  waitFor,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
} from "@testing-library/react";

import Application from "components/Application";

const fixtures = {
  days: [
    { id: 1, name: "Monday", appointments: [1, 2], interviewers: [1, 2], spots: 1 },
    { id: 2, name: "Tuesday", appointments: [3, 4], interviewers: [3, 4], spots: 1 },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: { student: "Archie Cohen", interviewer: 2 } },
    3: { id: 3, time: "2pm", interview: { student: "Leopold Silvers", interviewer: 4 } },
    4: { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    1: { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    2: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    3: { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    4: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  },
};

jest.mock("lib/storage", () => ({
  loadData: jest.fn(() => fixtures),
  saveData: jest.fn(),
}));

describe("Application", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { loadData } = require("lib/storage");
    loadData.mockReturnValue(fixtures);
  });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitFor(() => expect(getByText("Monday")).toBeInTheDocument());

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitFor(() =>
      expect(getByText(container, "Archie Cohen")).toBeInTheDocument()
    );

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitFor(() =>
      expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument()
    );

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitFor(() =>
      expect(getByText(container, "Archie Cohen")).toBeInTheDocument()
    );

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitFor(() =>
      expect(queryByAltText(appointment, "Add")).toBeInTheDocument()
    );

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    await waitFor(() =>
      expect(getByText(container, "Archie Cohen")).toBeInTheDocument()
    );

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "David Jardine" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitFor(() =>
      expect(queryByText(appointment, "David Jardine")).toBeInTheDocument()
    );

    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when save fails", async () => {
    const { saveData } = require("lib/storage");
    saveData.mockImplementationOnce(() => {
      throw new Error("Storage failed");
    });

    const { container } = render(<Application />);

    await waitFor(() =>
      expect(getByText(container, "Archie Cohen")).toBeInTheDocument()
    );

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitFor(() =>
      expect(
        queryByText(appointment, "Can't Save Appointment")
      ).toBeInTheDocument()
    );

    fireEvent.click(queryByAltText(appointment, "Close"));

    await waitFor(() =>
      expect(queryByText(container, "Can't Save Appointment")).not.toBeInTheDocument()
    );
  });

  it("shows the delete error when save fails after delete", async () => {
    const { saveData } = require("lib/storage");
    saveData.mockImplementationOnce(() => {
      throw new Error("Storage failed");
    });

    const { container } = render(<Application />);

    await waitFor(() =>
      expect(getByText(container, "Archie Cohen")).toBeInTheDocument()
    );

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitFor(() =>
      expect(
        queryByText(appointment, "Can't Delete Appointment")
      ).toBeInTheDocument()
    );

    fireEvent.click(queryByAltText(appointment, "Close"));

    await waitFor(() =>
      expect(queryByText(container, "Can't Delete Appointment")).not.toBeInTheDocument()
    );
  });
});
