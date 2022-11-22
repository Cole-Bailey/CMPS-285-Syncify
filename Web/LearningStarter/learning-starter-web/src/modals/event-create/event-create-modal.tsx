// import "../../modals/modal.css";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Input, Modal, Button } from "semantic-ui-react";
import {
  ApiResponse,
  EventCreateDto,
  EventGetDto,
} from "../../constants/types";
import axios from "axios";
import { BaseUrl } from "../../constants/env-cars";

function EventCreateModal() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const initialValues: EventCreateDto = {
    calendarId: 0,
    name: "",
    eventDetails: "",
    createdDate: new Date(),
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
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setSecondOpen(true);
    }
  };

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
              <Field id="name" name="name">
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
                <label htmlFor="createdDate" className="field-title">
                  Date
                </label>
              </div>
              <Field id="createdDate" name="createdDate">
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
            <Modal.Header>Success!!!</Modal.Header>
            <Modal.Content>
              <p>You have successfully created an event in Syncify!!!</p>
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
