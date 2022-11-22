import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Header, Input } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import {
  ApiResponse,
  GroupMemberCreateDto,
  GroupMemberGetDto,
} from "../../../constants/types";
import { routes } from "../../../routes/config";

const initialValues: GroupMemberCreateDto = {
  memberRoleId: 0,
  userId: 0,
  groupId: 0,
};

export const GroupMemberCreatePage = () => {
  const history = useHistory();

  const onSubmit = async (values: GroupMemberCreateDto) => {
    const response = await axios.post<ApiResponse<GroupMemberGetDto>>(
      `${BaseUrl}/api/group-members`,
      values
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      history.push(routes.groupMembers.listing);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div>
          <Form>
            <Header>Create Group Memeber</Header>
            <div>
              <label htmlFor="memberRoleId">Member Role</label>
            </div>
            <Field id="memberRoleId" name="memberRoleId">
              {({ field }) => <Input type="number" {...field} />}
            </Field>
            <div>
              <label htmlFor="userId">User</label>
            </div>
            <Field id="userId" name="userId">
              {({ field }) => <Input type="number" {...field} />}
            </Field>
            <div>
              <label htmlFor="groupId">Group</label>
            </div>
            <Field id="groupId" name="groupId">
              {({ field }) => <Input type="number" {...field} />}
            </Field>

            <div>
              <Button type="submit">Create</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};
