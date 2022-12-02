import "../../modals/modal.css";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Header, Modal, TextArea } from "semantic-ui-react";
import {
  ApiResponse,
  ShoppingListCreateDto,
  ShoppingListGetDto,
} from "../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/config";
import { BaseUrl } from "../../constants/env-cars";
import toast from "react-hot-toast";

const initialValues: ShoppingListCreateDto = {
  name: "",
};

export const ShoppingListCreateModal = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const onSubmit = async (values: ShoppingListCreateDto) => {
    const response = await axios.post<ApiResponse<ShoppingListGetDto>>(
      `${BaseUrl}/api/shopping-lists`,
      values,
      {
        validateStatus: () => true,
      }
    );

    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
        toast.error("Error has occured, please try again", {
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
      toast.success("Shopping List item created", {
        position: "top-center",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

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
              content="List Item"
              positive
              onClick={() => setOpen(true)}
            />
          }
        >
          <Modal.Header>Add An Item To Your Shopping List!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Shopping List Item</Header>
              <div className="field-title">
                <label htmlFor="name">Item Name</label>
              </div>
              <div className="field-title">
                <Field id="name" name="name">
                  {({ field }) => <TextArea {...field} />}
                </Field>
              </div>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button
              type="button"
              icon="cancel"
              content="Cancel"
              labelPosition="left"
              negative
              onClick={() => setOpen(false)}
            />
            <Button
              type="submit"
              icon="clipboard check"
              content="Add to List!"
              labelPosition="left"
              positive
            />
          </Modal.Actions>
        </Modal>
      </Formik>
    </>
  );
};
