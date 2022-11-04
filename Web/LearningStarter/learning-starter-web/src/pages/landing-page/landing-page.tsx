import React from "react";
import { Button, Header } from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import {routes} from "../../routes/config";
import "./landing-page.css";

//This is a basic Component, and since it is used inside of
//'../../routes/config.tsx' line 31, that also makes it a page




export const LandingPage = () => {
  const history = useHistory();

  const goMealTypeListing = () => {
    history.push(routes.mealTypes.listing)
  }

  const goGroupListing = () => {
    history.push(routes.group.listing)
  }

  const goIngredientListing = () => {
    history.push(routes.ingredients.listing)
  }

  const goShoppingListListing = () => {
    history.push(routes.shoppingList.listing)
  }

  const goRecipeListing = () => {
    history.push(routes.recipes.listing)
  }

  return (
    <>
      <div className="home-page-container">
        <Header>Home Page</Header>
      </div>
      <br/>
      <div className="home-page-container">
        <Button onClick={goMealTypeListing}>Meal Types</Button>
        <Button onClick={goGroupListing}>Groups</Button>
        <Button onClick={goIngredientListing}>Ingredients</Button>
        <Button onClick={goShoppingListListing}>Shopping Lists</Button>
        <Button onClick={goRecipeListing}>Recipes</Button>
      </div>
    </>
  );
};
