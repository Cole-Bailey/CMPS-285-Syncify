import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Input,
  Modal,
  Button,
  Table,
  Icon,
  TableCell,
} from "semantic-ui-react";
import {
  ApiResponse,
  EventCreateDto,
  EventGetDto,
} from "../../constants/types";
import axios from "axios";
import { BaseUrl } from "../../constants/env-cars";
import toast from "react-hot-toast";

const events = [
  {
    title: "My Big Day!!",
    start: new Date(2022, 12, 30),
    end: new Date(2022, 12, 30),
  },
  {
    title: "I need a a vacation, and a beer",
    start: new Date(2021, 11, 7),
    end: new Date(2021, 11, 10),
  },
  {
    title: "Math test",
    start: new Date(2021, 11, 20),
    end: new Date(2021, 11, 20),
  },
];

function EventCreateModal() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const initialValues: EventCreateDto = {
    calendarId: 0,
    name: "",
    eventDetails: "",
    StartDate: new Date(),
    EndDate: new Date(),
  };

  const onSubmit = async (values: EventCreateDto) => {
    const response = await axios.post<ApiResponse<EventGetDto>>(
      `${BaseUrl}/api/events`,
      values,
      {
        validateStatus: () => true,
      }
    );

    if (response.data.hasErrors) {
      toast.error("Error Occured, please try again", {
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setSecondOpen(true);
      toast.success("Event successfully created", {
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    // @ts-ignore
    setAllEvents([...allEvents, newEvent]);
  }
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Modal
          as={Form}
          onClose={() => setFirstOpen(false)}
          onOpen={() => setFirstOpen(true)}
          open={firstOpen}
          trigger={
            <Button onClick={() => setFirstOpen(true)}>Create Event</Button>
          }
        >
          <Modal.Header className="create-type-field">
            Create Event
          </Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <div>
                <label htmlFor="name" className="field-title">
                  Event Title
                </label>
              </div>
              <Field
                id="name"
                name="name"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              >
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="eventDetails" className="field-title">
                  Event Description
                </label>
              </div>
              <Field id="eventDetails" name="eventDetails">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="startDate" className="field-title">
                  StartDate
                </label>
              </div>
              <Field
                id="startDate"
                name="startDate"
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              >
                {({ field }) => <Input type="date" {...field} />}
              </Field>

              <div>
                <label htmlFor="endDate" className="field-title">
                  EndDate
                </label>
              </div>
              <Field
                id="endDate"
                name="endDate"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              >
                {({ field }) => <Input type="date" {...field} />}
              </Field>
              <div>
                <label htmlFor="calendarId" className="field-title">
                  Calendar
                </label>
              </div>
              <Field id="calendarId" name="calendarId">
                {({ field }) => <Input type="number" {...field} />}
              </Field>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions className="footer">
            <Button
              type="button"
              content="Cancel"
              onClick={() => setFirstOpen(false)}
              negative
            />
            <Button type="submit" content="Create" positive />
          </Modal.Actions>
          <Modal
            onClose={() => setSecondOpen(false)}
            open={secondOpen}
            size="small"
          >
            <Modal.Header>Success!</Modal.Header>
            <Modal.Content>
              <p>You have successfully created an event in Syncify!</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                type="button"
                icon="home"
                content="Home"
                labelPosition="right"
                positive
                onClick={() => setFirstOpen(false)}
              />
            </Modal.Actions>
          </Modal>
        </Modal>
      </Formik>
    </>
  );
}

export default EventCreateModal;
