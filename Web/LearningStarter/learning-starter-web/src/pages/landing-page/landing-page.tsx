import React from "react";
import "./landing-page.css";
import "../../components/LandingPageNav/landingpagenav.css";
// import { Navbar } from "../../components/LandingPageNav/landingpagenav";
import { PageWrapper } from "../../components/page-wrapper/page-wrapper";
import CalendarApp from "../../components/calendar/calendar";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page




export const LandingPage = () => {

  return (
    <>
    <div className="background-color">
      <div>
        <PageWrapper />
        {/* <Navbar /> */}
      </div> 
      <CalendarApp></CalendarApp>
      </div> 
    </>
  );
};
