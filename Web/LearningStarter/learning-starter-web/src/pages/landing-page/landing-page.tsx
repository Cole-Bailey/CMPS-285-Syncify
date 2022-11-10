import React from "react";
import "./landing-page.css";
import { MealTypesButton, GroupsButton, IngredientsButton, ShoppingListsButton, RecipesButton, MemberRolesButton } from "../../components/buttons/navigation-buttons";
import Navbar from "../../components/LandingPageNav/landingpagenav";
import CalendarApp from "../../components/calendar/calendar";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page




export const LandingPage = () => {

  return (
    <>
    <div className="background-color">
      <div className = "Navbar">
      <Navbar></Navbar>
      </div> 
      <CalendarApp></CalendarApp>
      </div> 
    </>
  );
};
