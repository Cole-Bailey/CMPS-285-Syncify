import "../../modals/modal.css";
import SyncifyImg from "../../assets/Syncify.png";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Header, Input, Modal } from "semantic-ui-react";
import {
  ApiResponse,
  OptionDto,
  UserCreateDto,
  UserGetDto,
} from "../../constants/types";
import { BaseUrl } from "../../constants/env-cars";

function UserCreateModal() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [colorOptions, setColorOptions] = useState<OptionDto[]>();
  console.log("debug", colorOptions);
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

  const onSubmit = async (values: UserCreateDto) => {
    const response = await axios.post<ApiResponse<UserGetDto>>(
      `${BaseUrl}/api/users`,
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

  useEffect(() => {
    async function getColorOptions() {
      const response = await axios.get<ApiResponse<OptionDto[]>>(
        "/api/profile-colors/options"
      );

      setColorOptions(response.data.data);
    }

    getColorOptions();
  }, []);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Modal
          as={Form}
          onClose={() => setFirstOpen(false)}
          onOpen={() => setFirstOpen(true)}
          open={firstOpen}
          trigger={<Button onClick={() => setFirstOpen(true)}>Register</Button>}
        >
          <Modal.Header>Register For Membership</Modal.Header>
          <Modal.Content image>
            <img sizes="medium" src={SyncifyImg} alt="Syncify" />
            <Modal.Description>
              <Header>Sign Up</Header>
              <div className="input-fields">
                <label htmlFor="profileColorId">Profile Color</label>
              </div>
              <div className="field-title">
                <Field
                  name="profileColorId"
                  id="profileColorId"
                  className="field"
                >
                  {({ field, form }) => (
                    <Dropdown
                      selection
                      options={colorOptions}
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
              </div>
              <div className="field-title">
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="field-title">
                <Field id="firstName" name="firstName">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
              <div className="field-title">
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="field-title">
                <Field id="lastName" name="lastName">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
              <div className="field-title">
                <label htmlFor="username">Username</label>
              </div>
              <div className="field-title">
                <Field id="username" name="username">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
              <div className="field-title">
                <label htmlFor="password">Password</label>
              </div>
              <div className="field-title">
                <Field id="password" name="password">
                  {({ field }) => <Input type="password" {...field} />}
                </Field>
              </div>
              <div className="field-title">
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <div className="field-title">
                <Field id="phoneNumber" name="phoneNumber">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
              <div className="field-title">
                <label htmlFor="email">Email</label>
              </div>
              <div className="field-title">
                <Field id="email" name="email">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
              <div className="field-title">
                <label htmlFor="birthday">Birthday</label>
              </div>
              <div className="field-title">
                <Field id="birthday" name="birthday">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button
              type="button"
              content="Don't Sign Me Up!"
              labelPosition="right"
              icon="thumbs down outline"
              negative
              onClick={() => setFirstOpen(false)}
            />
            <Button
              type="submit"
              content="Sign Me Up!"
              labelPosition="right"
              icon="thumbs up outline"
              positive
            />
          </Modal.Actions>
          <Modal
            onCLose={() => setSecondOpen(false)}
            open={secondOpen}
            size="small"
          >
            <Modal.Header>Success!!!</Modal.Header>
            <Modal.Content>
              <p>
                You have successfully registered for Syncify. Please enjoy!!!
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                type="button"
                icon="hand rock outline"
                content="Welcome!!!"
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

export default UserCreateModal;
