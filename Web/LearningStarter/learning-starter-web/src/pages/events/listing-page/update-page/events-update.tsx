import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Button, Input } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import {useRouteMatch} from "react-router-dom";
import { routes } from "../../../../routes/config";
import { useHistory } from "react-router-dom";
import { ApiResponse, EventGetDto, EventUpdateDto, } from "../../../../constants/types";


export const EventUpdatePage = () => {
    const history = useHistory();
    let match = useRouteMatch<{id: string}>();
    const id = match.params.id;
    const [event, setEvents] = useState<EventGetDto>();

    useEffect(() =>{
        const   fetchEvents = async () => {
            const response = await axios.get<ApiResponse<EventGetDto>>(
                `/api/events/${id}`
            );

            if (response.data.hasErrors){
                console.log(response.data.errors);
                return;
            }

            setEvents(response.data.data);
        }

        fetchEvents();
    });

    const onSubmit = async (values: EventUpdateDto) =>{
        const response = await axios.put<ApiResponse<EventGetDto>>(
            `/api/events/${id}`,
            values
        );

        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        } else{
            history.push(routes.events.listing);
        }
    };

    return(
        <>
        {event && (
        <Formik initialValues= {event} onSubmit={onSubmit}>
            <Form>
                <div>
                    <label htmlFor="name">Name</label>
                </div>
                <div>
                    <label htmlFor="eventDetails">Event Details</label>
                </div>
                <div>

                </div>
                <Field id= 'name' name ='name'>
                    {({field}) => <Input{...field}/>}
                </Field>
                <Field id = 'eventDetails' name = 'eventDetails'>
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