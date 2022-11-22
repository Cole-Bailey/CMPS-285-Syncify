import "../../modals/modal.css";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Header, Input, Modal } from "semantic-ui-react";
import {
  ApiResponse,
  ShoppingListCreateDto,
  ShoppingListGetDto,
} from "../../constants/types";
import { BaseUrl } from "../../constants/env-cars";

function ShoppingListCreateModal() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const initialValues: ShoppingListCreateDto = {
    name: "",
  };

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
            <Button onClick={() => setFirstOpen(true)}>
              Create Shopping List
            </Button>
          }
        >
          <Modal.Header>Create Your Shopping List!</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Shopping List</Header>
              <div className="field-title">
                <label htmlFor="name">Item Name</label>
              </div>
              <div className="field-title">
                <Field id="name" name="name">
                  {({ field }) => <Input {...field} />}
                </Field>
              </div>
            </Modal.Description>
          </Modal.Content>

          <Modal.Actions>
            <Button
              type="button"
              content="Don't Create List!"
              labelPosition="right"
              icon="thumbs down outline"
              negative
              onClick={() => setFirstOpen(false)}
            />
            <Button
              type="submit"
              content="Create My List!"
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
                You have successfully created a shopping list withing Syncify.
                Please enjoy!!!
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                type="button"
                icon="hand rock outline"
                content="Shopping List Created"
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

export default ShoppingListCreateModal;
