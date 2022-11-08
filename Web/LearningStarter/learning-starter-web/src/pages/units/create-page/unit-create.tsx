import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Input } from "semantic-ui-react";
import {
    ApiResponse,
    UnitCreateDto,
    UnitGetDto,
} from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import { BaseUrl } from "../../../constants/env-cars";
import "./unit-create";

const initialValues: UnitCreateDto = {
    name: "",
    abbreviation: "",
};

export const UnitCreatePage = () => {
    const history = useHistory();

    const onSubmit = async (values: UnitCreateDto) => {
    const response = await axios.post<ApiResponse<UnitGetDto>>(
        `${BaseUrl}/api/units`,
        values
    );

    if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
        console.log(err.message);
        });
    } else {
        history.push(routes.units.listing);
    }
    };

    return (
    <>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <div>
                    <label htmlFor="name">Name</label>
                </div>
                <Field id="name" name="name" >
                    {({ field }) => <Input {...field} />}
                </Field>                
                <div >
                    <label htmlFor="abbreviation">Abbreviation</label>
                </div>
                <div >
                <Field id="abbreviation" name="abbreviation" >
                    {({ field }) => <Input {...field} />}
                </Field>
                </div>
                <div >
                    <Button type="submit">Create</Button>
                </div>
            </Form>
        </Formik>
    </>
    );
};

