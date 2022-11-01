import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { ApiResponse, GroupGetDto, GroupUpdateDto } from "../../../constants/types";
import { useRouteMatch } from "react-router-dom";
import { routes } from "../../../routes/config";
import { useHistory } from "react-router-dom";
import "./group-update.css";

export const GroupUpdatePage = () => {
    const history = useHistory();
    let match = useRouteMatch<{id: string}>();
    const id = match.params.id;
    const [group, setGroup] = useState<GroupGetDto>();

    useEffect(() => {
        const fetchGroup = async () => {
        const response = await axios.get<ApiResponse<GroupGetDto>>(
            `/api/group/${id}`
        );

        if (response.data.hasErrors){
            console.log(response.data.errors);
            return;
        }

        setGroup(response.data.data);
        }
    
        fetchGroup();
    }, [id]);

    const onSubmit = async (values: GroupUpdateDto) => {
        const response = await axios.put<ApiResponse<GroupGetDto>>(
            `/api/group/${id}`,
            values
        );
        
            if (response.data.hasErrors) {
                response.data.errors.forEach((err) => {
                console.log(err.message);
                });
            } else {
                history.push(routes.group.listing);
            }
    };
    
    return (
        <>
        
        {group &&   (
            <Formik initialValues={group} onSubmit={onSubmit}>
                <Form>
                    <div className="group-update-container">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="group-update-container">
                    <Field id="name" name="name">
                        {({field}) => <Input {...field} />}
                    </Field>
                    </div>
                    <div className="group-update-container">
                        <label htmlFor="image">Image</label>
                    </div>
                    <div className="group-update-container">
                    <Field id="image" name="image">
                        {({field}) => <Input {...field} />}
                    </Field>
                    </div>
                    <div className="group-update-container">
                    <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </Formik>
        )}
        </>
        );
    
};