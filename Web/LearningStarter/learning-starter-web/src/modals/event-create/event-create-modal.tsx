import "../../modals/modal.css";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Input, Header } from "semantic-ui-react";
import {
  ApiResponse,
  EventCreateDto,
  EventGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constants/env-cars";
import { routes } from "../../routes/config";

function EventCreateModal({ setOpenModal }) {
  const initialValues: EventCreateDto = {
    calendarId: 0,
    name: "",
    eventDetails: "",
    createdDate: new Date(),
  };
  const history = useHistory();
  const onSubmit = async (values: EventCreateDto) => {
    const response = await axios.post<ApiResponse<EventGetDto>>(
      `${BaseUrl}/api/events`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.events.listing);
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <Header className="create-type-field">Create Event</Header>
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="input-fields">
              <div>
                <label htmlFor="calendarId" className="field-title">
                  Calendar
                </label>
              </div>
              <Field id="calendarId" name="calendarId">
                {({ field }) => <Input {...field} />}
              </Field>
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
                {({ field }) => <Input {...field} />}
              </Field>

              <div className="footer">
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  id="cancelBtn"
                >
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EventCreateModal;
