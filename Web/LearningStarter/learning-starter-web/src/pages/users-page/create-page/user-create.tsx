import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Input } from "semantic-ui-react";
import {
  ApiResponse,
  UserCreateDto,
  UserGetDto,
} from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/env-cars";
import "./user-create.css";


const initialValues: UserCreateDto = {
  profileColorId: 0,
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phoneNumber: "",
  email: "",
  birthday: "",
};

export const UsersCreatePage = () => {
  const history = useHistory();

  const onSubmit = async (values: UserCreateDto) => {
    const response = await axios.post<ApiResponse<UserGetDto>>(
      `${BaseUrl}/api/users`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.users.listing);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
            <div className="user-create-container">
              <label htmlFor="profileColorId">Profile Color</label>
            </div>
            <div className="user-create-container">
            <Field id="profileColorId" name="profileColorId" >
              {({ field }) => <Input type="number" {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="user-create-container">
            <Field id="firstName" name="firstName" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="user-create-container">
            <Field id="lastName" name="lastName" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="username">Username</label>
            </div>
            <div className="user-create-container">
            <Field id="username" name="username" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="password">Password</label>
            </div>
            <div className="user-create-container">
            <Field id="password" name="password" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>
            <div className="user-create-container">
            <Field id="phoneNumber" name="phoneNumber" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="email">Email</label>
            </div>
            <div className="user-create-container">
            <Field id="email" name="email" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>
            <div className="user-create-container">
              <label htmlFor="birthday">Birthday</label>
            </div>
            <div className="user-create-container">
            <Field id="birthday" name="birthday" >
              {({ field }) => <Input {...field} />}
            </Field>
            </div>

            <div className="user-create-container">
              <Button type="submit">Create</Button>
            </div>
        </Form>
      </Formik>
    </>
  );
};

