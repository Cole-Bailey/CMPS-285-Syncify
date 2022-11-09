import React from "react";
import { Header } from "semantic-ui-react";
import "./landing-page.css";
import { MealTypesButton, GroupsButton, IngredientsButton, ShoppingListsButton, RecipesButton, MemberRolesButton } from "../../components/buttons/navigation-buttons";
import CalendarComponent from "../calendar-page/calendar-page";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page




export const LandingPage = () => {

  return (
    <>
      <div className="home-page-container">
        <Header>Home Page</Header>
      </div>
      <br/>      
      <div className="home-page-container">      
        <MemberRolesButton></MemberRolesButton>
        <GroupsButton></GroupsButton>
        <IngredientsButton></IngredientsButton>
        <ShoppingListsButton></ShoppingListsButton>
        <RecipesButton></RecipesButton>
        <MealTypesButton></MealTypesButton>
      </div>
    </>
  );
};
