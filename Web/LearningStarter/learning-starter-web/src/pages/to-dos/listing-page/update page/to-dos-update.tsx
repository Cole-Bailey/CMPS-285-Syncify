import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Button, Input } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import {useRouteMatch} from "react-router-dom";
import { routes } from "../../../../routes/config";
import { useHistory } from "react-router-dom";
import { ApiResponse, ToDoGetDto, ToDoUpdateDto } from "../../../../constants/types";


export const ToDoUpdatePage = () => {
    const history = useHistory();
    let match = useRouteMatch<{id: string}>();
    const id = match.params.id;
    const [todo, setToDos] = useState<ToDoGetDto>();

    useEffect(() =>{
        const   fetchToDos = async () => {
            const response = await axios.get<ApiResponse<ToDoGetDto>>(
                `/api/to-dos/${id}`
            );

            if (response.data.hasErrors){
                console.log(response.data.errors);
                return;
            }

            setToDos(response.data.data);
        }

        fetchToDos();
    });

    const onSubmit = async (values: ToDoUpdateDto) =>{
        const response = await axios.put<ApiResponse<ToDoGetDto>>(
            `/api/to-dos/${id}`,
            values
        );

        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        } else{
            history.push(routes.toDos.listing);
        }
    };

    return(
        <>
        {todo && (
        <Formik initialValues= {todo} onSubmit={onSubmit}>
            <Form>
                <div>
                    <label htmlFor="title">Title</label>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                </div>
                <div>

                </div>
                <Field id= 'title' name ='title'>
                    {({field}) => <Input{...field}/>}
                </Field>
                <Field id = 'description' name = 'description'>
                    {({field}) => <Input{...field}/>}
                </Field>

                <div>
                    <Button type="submit">
                        Create
                    </Button>
                </div>
            </Form>
        </Formik>
        )}
        </>
    );
}