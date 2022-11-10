import React, { useEffect, useState } from "react";
import "./landing-page.css";
import "../../components/LandingPageNav/landingpagenav.css";
// import { Navbar } from "../../components/LandingPageNav/landingpagenav";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";
import CalendarApp from "../../components/calendar/calendar";
import { Header } from "semantic-ui-react";
import { Button, Icon, Segment, Table } from "semantic-ui-react";
import { ApiResponse, UserGetDto } from "../../constants/types";
import { BaseUrl } from "../../constants/env-cars";
import axios from "axios";
import { useUser } from "../../authentication/use-auth";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page



export const LandingPage = () => {
    const user = useUser();
  return (
    <>
          <div>
        <PageWrapper/>
      </div> 
    <div className="background-color">
      <div className= "header-title-logo">
        <b><Header>Syncify</Header></b>
      </div>
      
      <div className= "header-title-name">
        <Header>Hello, {user.firstName}</Header>
      </div>
      <div className="btn-group">
      <Button>Create Event</Button>
      <Button>Create Todo</Button>
      <Button>Shopping Lists ▼</Button>
      <Button>Recipes ▼</Button>
      </div>
      <div className= "calendar-component">
      <CalendarApp></CalendarApp>
      </div>
      </div> 
    </>
  );
};
