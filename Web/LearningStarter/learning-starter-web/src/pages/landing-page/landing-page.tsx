import React, { useState } from "react";
import "./landing-page.css";
import "../../components/LandingPageNav/landingpagenav.css";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";
import CalendarApp from "../../components/calendar/calendar";
import { Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { useUser } from "../../authentication/use-auth";
import EventCreateModal from "../../modals/event-create/event-create-modal";
import ToDoCreateModal from "../../modals/to-do-create/to-do-create-modal";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page

//This is where the modals go, just add to button
export const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useUser();
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
        <EventCreateModal />
        <ToDoCreateModal />

        <Button>Shopping Lists ▼</Button>
        <Button>Recipes ▼</Button>
      </div>
      <div className="calendar-component">
        <CalendarApp></CalendarApp>
      </div>
    </>
  );
};
