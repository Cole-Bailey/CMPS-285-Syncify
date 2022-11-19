import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiResponse, ToDoGetDto } from "../../../../constants/types";
import { BaseUrl } from "../../../../constants/env-cars";
import { Segment } from "semantic-ui-react";
import "./todos-listing.css";

export const ToDoListingPage = () => {
  const [todos, setToDos] = useState<ToDoGetDto[]>();
  const fetchToDos = async () => {
    const response = await axios.get<ApiResponse<ToDoGetDto[]>>(
      `${BaseUrl}/api/to-dos`
    );
    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setToDos(response.data.data);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  return (
    <>
      <div>
        {todos ? (
          todos.map((todos) => {
            return (
              <Segment className="indexing">
                <div>Calender: {todos.calendar.group.name}</div>
                <div>Id: {todos.id}</div>
                <div>Title: {todos.title}</div>
                <div>Description: {todos.description}</div>
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
