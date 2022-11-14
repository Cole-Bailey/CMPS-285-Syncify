import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { ApiResponse, EventGetDto } from "../../../constants/types";
import { BaseUrl } from "../../../constants/env-cars";

export const EventListingPage = () => {
  const [events, setEvents] = useState<EventGetDto[]>();
  const fetchEvents = async () => {
    const response = await axios.get<ApiResponse<EventGetDto[]>>(
      `${BaseUrl}/api/events`
    );
    if (response.data.hasErrors) {
      response.data.errors.forEach((err) => {
        console.log(err.message);
      });
    } else {
      setEvents(response.data.data);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div>
        {events ? (
          events.map((events) => {
            return (
              <Segment>
                <div>CalenderId: {events.calendarId.groupId.name}</div>
                <div>Id: {events.id}</div>
                <div>Title: {events.name}</div>
                <div>Description: {events.eventDetails}</div>
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
