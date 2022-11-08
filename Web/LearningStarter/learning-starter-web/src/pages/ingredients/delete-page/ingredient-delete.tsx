import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { ApiResponse, IngredientGetDto } from "../../../constants/types";
import { useRouteMatch } from "react-router-dom";
import { routes } from "../../../routes/config";
import { useHistory } from "react-router-dom";
import "./ingredient-delete.css";

export const IngredientDeletePage = () => {
    const history = useHistory();
    let match = useRouteMatch<{id: string}>();
    const id = match.params.id;
    const [ingredient, setIngredients] = useState<IngredientGetDto>();

    useEffect(() => {
        const fetchIngredients = async () => {
        const response = await axios.get<ApiResponse<IngredientGetDto>>(
            `/api/ingredients/${id}`
        );

        if (response.data.hasErrors){
            console.log(response.data.errors);
            return;
        }

        setIngredients(response.data.data);
        }
    
        fetchIngredients();
    }, [id]);

    const onSubmit = async () => {
        const response = await axios.delete<ApiResponse<IngredientGetDto>>(
            `/api/ingredients/${id}`,
        );
        
            if (response.data.hasErrors) {
                response.data.errors.forEach((err) => {
                console.log(err.message);
                });
            } else {
                history.push(routes.ingredients.listing);
            }
    };
    
    return (
        <>
        
        {ingredient &&   (
            <Formik initialValues={ingredient} onSubmit={onSubmit}>
                <Form>
                    <div className="ingredient-delete-container">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="ingredient-delete-container">
                    <Field id="name" name="name">
                        {({field}) => <Input {...field} />}
                    </Field>
                    </div>
                    <div className="ingredient-delete-container">
                        <label htmlFor="image">Image</label>
                    </div>
                    <div className="ingredient-delete-container">
                    <Field id="image" name="image">
                        {({field}) => <Input {...field} />}
                    </Field>
                    </div>
                    <div className="ingredient-delete-container">
                    <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </Formik>
        )}
        </>
        );
    
};