import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Dropdown } from "semantic-ui-react";
import {
  ApiResponse,
  EventCreateDto,
  EventGetDto,
  OptionDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import axios from "axios";
import { BaseUrl } from "../../constants/env-cars";
import toast from "react-hot-toast";

const initialValues: EventCreateDto = {
  calendarId: 0,
  name: "",
  eventDetails: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const EventCreateModal = ({
  refetchEvents,
}: {
  refetchEvents: () => {};
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [calendarOptions, setCalendarOptions] = useState<OptionDto[]>();
  console.log("debug", calendarOptions);

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
      setOpen(false);
      history.push(routes.home);
      toast.success("Event successfully created", {
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      refetchEvents();
    }
  };

  useEffect(() => {
    async function getCalendarOptions() {
      const response = await axios.get<ApiResponse<OptionDto[]>>(
        "/api/calendars/options"
      );

      setCalendarOptions(response.data.data);
    }

    getCalendarOptions();
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Modal
          as={Form}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button
              icon="circle plus"
              labelPosition="left"
              content="Event"
              positive
              onClick={() => setOpen(true)}
            />
          }
        >
          <Modal.Header className="create-type-field">
            Create Event
          </Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <div>
                <label htmlFor="name" className="field-title">
                  Event Name
                </label>
              </div>
              <Field id="name" name="name">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="eventDetails" className="field-title">
                  Event Details
                </label>
              </div>
              <Field id="eventDetails" name="eventDetails">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="startDate" className="field-title">
                  Start Date
                </label>
              </div>
              <Field id="startDate" name="startDate">
                {({ field }) => <Input type="smalldatetime" {...field} />}
              </Field>

              <div>
                <label htmlFor="endDate" className="field-title">
                  End Date
                </label>
              </div>
              <Field id="endDate" name="endDate">
                {({ field }) => <Input type="smalldatetime" {...field} />}
              </Field>
              <div>
                <label htmlFor="calendar">Calendar</label>
              </div>
              <Field name="calendarId" id="calendarId" className="field">
                {({ field, form }) => (
                  <Dropdown
                    selection
                    options={calendarOptions}
                    {...field}
                    onChange={(_, { name, value }) =>
                      form.setFieldValue(name, value)
                    }
                    onBlur={(_, { name, value }) =>
                      form.setFieldValue(name, value)
                    }
                  />
                )}
              </Field>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions className="footer">
            <Button
              type="button"
              icon="cancel"
              content="Cancel"
              labelPosition="left"
              onClick={() => setOpen(false)}
              negative
            />
            <Button
              type="submit"
              icon="calendar check"
              content="Create"
              labelPosition="left"
              positive
            />
          </Modal.Actions>
        </Modal>
      </Formik>
    </>
  );
};
