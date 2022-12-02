import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Input } from "semantic-ui-react";
import {
  ApiResponse,
  ToDoGetDto,
  ToDoCreateDto,
} from "../../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../../routes/config";
import { BaseUrl } from "../../../../constants/env-cars";

const initialValues: ToDoCreateDto = {
  calendarId: 0,
  name: "",
  toDoDetails: "",
  startDate: new Date(),
  endDate: new Date(),
};

export const ToDoCreatePage = () => {
  const history = useHistory();
  const onSubmit = async (values: ToDoCreateDto) => {
    const response = await axios.post<ApiResponse<ToDoGetDto>>(
      `${BaseUrl}/api/to-dos`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.toDos.listing);
    }
  };
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <Field id="name" name="name">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="toDoDetails">To-Do Details</label>
          </div>
          <Field id="toDoDetails" name="toDoDetails">
            {({ field }) => <Input {...field} />}
          </Field>
          <div>
            <label htmlFor="CalendarId">CalendarId</label>
          </div>
          <Field id="CalendarId" name="CalendarId">
            {({ field }) => <Input type="number" {...field} />}
          </Field>

          <div>
            <Button type="submit">Create</Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
