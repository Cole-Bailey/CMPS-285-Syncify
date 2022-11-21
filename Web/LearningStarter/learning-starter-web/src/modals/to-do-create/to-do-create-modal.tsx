// import "../../modals/modal.css";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Input, Modal, Button } from "semantic-ui-react";
import { ApiResponse, ToDoCreateDto, ToDoGetDto } from "../../constants/types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../constants/env-cars";
import { routes } from "../../routes/config";

function ToDoCreateModal() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const initialValues: ToDoCreateDto = {
    calendarId: 0,
    title: "",
    description: "",
    date: new Date(),
  };
  const history = useHistory();

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
            <Button onClick={() => setFirstOpen(true)}>Create To-Do</Button>
          }
        >
          <Modal.Header className="create-type-field">
            Create To-Do
          </Modal.Header>

          <Modal.Content>
            <Modal.Description>
              <div>
                <label htmlFor="title" className="field-title">
                  To-Do Title
                </label>
              </div>
              <Field id="title" name="title">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="description" className="field-title">
                  To-Do Description
                </label>
              </div>
              <Field id="description" name="description">
                {({ field }) => <Input {...field} />}
              </Field>
              <div>
                <label htmlFor="date" className="field-title">
                  Date
                </label>
              </div>
              <Field id="date" name="date">
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
              <p>You have successfully created a to-do in Syncify!!!</p>
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

export default ToDoCreateModal;
