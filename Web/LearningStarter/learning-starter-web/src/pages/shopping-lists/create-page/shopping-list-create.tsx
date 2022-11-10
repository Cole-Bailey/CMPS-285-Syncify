import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Header, Input } from "semantic-ui-react";
import { ApiResponse, ShoppingListCreateDto, ShoppingListGetDto } from "../../../constants/types";
import { useHistory} from 'react-router-dom'
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/env-cars";
import "./shopping-list-create.css";

const initialValues: ShoppingListCreateDto = {
    name: "",
};

export const ShoppingListCreatePage = () => {
    const history = useHistory();
    const onSubmit = async (values: ShoppingListCreateDto) => {
        const response = await axios.post<ApiResponse<ShoppingListGetDto>>(`${BaseUrl}/api/shopping-lists`,
        values
        );

        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
                <Header >
                    Error has occured please try again
                </Header>
            });
        } else {
            history.push(routes.shoppingLists.listing)
        }
    };
    return (
        <>
        <Formik initialValues= {initialValues} onSubmit={onSubmit}>
                <div className="shopping-list-create-container">
            <Form>
                <Header>Create Shopping List Item</Header>
                <div>
                    <label htmlFor="name">Name</label>
                </div>
                <Field id='name' name='name'>
                    {({field}) => <Input {...field} />}
                </Field>

                <div>
                    <Button type="submit">
                        Create
                    </Button>
                </div>
            </Form>
            </div>
        </Formik>
        </>
    );
};