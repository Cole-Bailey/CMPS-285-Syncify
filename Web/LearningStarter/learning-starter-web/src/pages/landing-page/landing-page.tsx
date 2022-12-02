import React, { useEffect, useState } from "react";
import "./landing-page.css";
import "../../components/LandingPageNav/landingpagenav.css";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";
import { Header } from "semantic-ui-react";
import { useUser } from "../../authentication/use-auth";
import { EventCreateModal } from "../../modals/event-create/event-create-modal";
import { ToDoCreateModal } from "../../modals/to-do-create/to-do-create-modal";
import Calendar from "../../components/calendar/calendar";
import { ApiResponse, EventGetDto } from "../../constants/types";
import axios from "axios";
import { ShoppingListCreateModal } from "../../modals/shopping-list-create/shopping-list-create-modal";
import { RecipeCreateModal } from "../../modals/recipe-pages/recipe-create-modal";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page

//This is where the modals go, just add to button

const eventsStart = [] as EventGetDto[];

export const LandingPage = () => {
  const user = useUser();
  const [events, setEvents] = useState<EventGetDto[]>(eventsStart);

  const fetchEvents = async () => {
    const response = await axios.get<ApiResponse<EventGetDto[]>>("/api/events");
    setEvents(response.data.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div>
        <PageWrapper />
      </div>

      <div className="header-title-logo">
        <b>
          <Header className="logo-txt">Syncify</Header>
        </b>
      </div>

      <div className="header-title-name">
        <Header>Hello, {user.firstName}</Header>
      </div>

      <div className="btn-group">
        <EventCreateModal refetchEvents={fetchEvents} />
        <ToDoCreateModal />
        <ShoppingListCreateModal />
        <RecipeCreateModal />
      </div>
      <div className="calendar-component">
        <Calendar events={events}></Calendar>
      </div>
    </>
  );
};
