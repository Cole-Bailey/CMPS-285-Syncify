import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Dropdown } from "semantic-ui-react";
import {
  ApiResponse,
  OptionDto,
  ToDoCreateDto,
  ToDoGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import axios from "axios";
import { BaseUrl } from "../../constants/env-cars";
import toast from "react-hot-toast";

const initialValues: ToDoCreateDto = {
  calendarId: 0,
  name: "",
  toDoDetails: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const ToDoCreateModal = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [calendarOptions, setCalendarOptions] = useState<OptionDto[]>();
  console.log("debug", calendarOptions);

  const onSubmit = async (values: ToDoCreateDto) => {
    const response = await axios.post<ApiResponse<ToDoGetDto>>(
      `${BaseUrl}/api/to-dos`,
      values,
      {
        validateStatus: () => true,
      }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
        toast.error("Error Occured", {
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      });
    } else {
      setOpen(false);
      history.push(routes.home);
      toast.success("To-Do created", {
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
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
              content="To-Do"
              positive
              onClick={() => setOpen(true)}
            />
          }
        >
          <Modal.Header className="create-type-field">
            Create To-Do
          </Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <div>
                <label htmlFor="name" className="field-title">
                  To-Do Name
                </label>
              </div>
              <Field id="name" name="name">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="toDoDetails" className="field-title">
                  To-Do Details
                </label>
              </div>
              <Field id="toDoDetails" name="toDoDetails">
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
                <label htmlFor="calendarId">Calendar</label>
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
