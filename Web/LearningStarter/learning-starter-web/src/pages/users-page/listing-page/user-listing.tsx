import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, UserGetDto } from "../../../constants/types";

export const UsersListingPage = () => {
    const [users, setUsers] = useState<UserGetDto[]>();
    const fetchUsers = async() => {
        const response = await axios.get<ApiResponse<UserGetDto[]>>(
            `${BaseUrl}/api/users`
            );
        if(response.data.hasErrors){
            response.data.errors.forEach((err) => {
                console.log(err.message);
            });
        } else {
            setUsers(response.data.data);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div>
                {users ? ( 
                users.map(users => {
                    return (
                        <Segment>
                            <div>Id: {users.id}</div>
                            <div>Profile Color Id: {users.profileColorId}</div>
                            <div>First Name: {users.firstName}</div>
                            <div>Last Name: {users.lastName}</div>
                            <div>Userame: {users.username}</div>
                            <div>Phone Number: {users.phoneNumber}</div>
                            <div>Email: {users.email}</div>
                            <div>Birthday: {users.birthday}</div>
                        </Segment>
                    );
                }) 
            ) : (
                <div>Loading</div>
            )}
        </div>
        </>
    );
};