import React from "react";
import {useHistory} from "react-router-dom";
import { Button } from "semantic-ui-react";
import { routes } from "../../routes/config";

export const HomeButton = () => {
    const history = useHistory();

    return (
        <Button onClick={() => history.push(routes.home)}>
            Home
        </Button>
    )
}

export const MealTypesButton = () => {
    const history = useHistory();

    return(
        <Button onClick={() => history.push(routes.mealTypes.listing)}>
            Meal Types
        </Button>
    )
}

export const GroupsButton = () => {
    const history = useHistory();

    return (
        <Button onClick={() => history.push(routes.group.listing)}>
            Groups
        </Button>
    )
}

export const IngredientsButton = () => {
    const history = useHistory();

    return (
        <Button onClick={() => history.push(routes.ingredients.listing)}>
            Ingredients
        </Button>
    )
}

export const ShoppingListsButton = () => {
    const history = useHistory();

    return (
        <Button onClick={() => history.push(routes.shoppingLists.listing)}>
            Shopping Lists
        </Button>
    )
}

export const RecipesButton = () => {
    const history = useHistory();

    return (
        <Button onClick={() => history.push(routes.recipes.listing)}>
            Recipes
        </Button>
    )
}

export const MemberRolesButton = () => {
    const history = useHistory();

    return (
        <Button onClick={() => history.push(routes.memberRoles.listing)}>
            Member Roles
        </Button>
    )
}