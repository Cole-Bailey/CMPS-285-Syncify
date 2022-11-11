import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LandingPage } from "../pages/landing-page/landing-page";
import { NotFoundPage } from "../pages/not-found";
import { useUser } from "../authentication/use-auth";
import { UserPage } from "../pages/user-page/user-page";
import { PageWrapper } from "../components/page-wrapper/page-wrapper";
import { MealTypeListingPage } from "../pages/meal-types/listing-page/meal-type-listing";
import { MealTypeCreatePage } from "../pages/meal-types/create-page/meal-type-create";
import { MealTypeUpdatePage } from "../pages/meal-types/update-page/meal-type-update";
import { IngredientListingPage } from "../pages/ingredients/listing-page/ingredient-listing";
import { IngredientCreatePage } from "../pages/ingredients/create-page/ingredient-create";
import { IngredientUpdatePage } from "../pages/ingredients/update-page/ingredient-update";
import { IngredientDeletePage } from "../pages/ingredients/delete-page/ingredient-delete";
import { ShoppingListListingPage } from "../pages/shopping-lists/listing-page/shopping-list-listing";
import { ShoppingListCreatePage } from "../pages/shopping-lists/create-page/shopping-list-create";
import { ShoppingListUpdatePage } from "../pages/shopping-lists/update-page/shopping-list-update";
import { ShoppingListDeletePage } from "../pages/shopping-lists/delete-page/shopping-list-delete";
import { UnitListingPage } from "../pages/units/listing-page/units-listing";
import { UnitCreatePage } from "../pages/units/create-page/unit-create";
import { UnitUpdatePage } from "../pages/units/update-page/unit-update";
import { UnitDeletePage } from "../pages/units/delete-page/unit-delete";
import { ToDoListingPage } from "../pages/to-dos/listing-page/listing page/to-dos-listing";
import { ToDoCreatePage } from "../pages/to-dos/listing-page/create page/to-dos-create";
import { ToDoUpdatePage } from "../pages/to-dos/listing-page/update page/to-dos-update";
import { GroupListingPage } from "../pages/group-page/listing-page/group-listing";
import { GroupCreatePage } from "../pages/group-page/create-page/group-create";
import { GroupUpdatePage } from "../pages/group-page/update-page/group-update";
import { RecipeListingPage } from "../pages/recipes-page/listing-page/recipe-listing";
import { RecipeCreatePage } from "../pages/recipes-page/create-page/recipe-create";
import { RecipeUpdatePage } from "../pages/recipes-page/update-page/recipe-update";
import { RecipeDeletePage } from "../pages/recipes-page/delete-page/recipe-delete";
import { UsersCreatePage } from "../pages/users-page/create-page/user-create";
import { UsersListingPage } from "../pages/users-page/listing-page/user-listing";
import { UsersUpdatePage } from "../pages/users-page/update-page/user-update";
import { MealTypeDeletePage } from "../pages/meal-types/delete-page/meal-type-delete";
import { MemberRoleListingPage } from "../pages/member-role-page/listing-page/member-role-listing-page";
import { MemberRoleCreatePage } from "../pages/member-role-page/create-page/member-role-create";
import { MemberRoleUpdatePage } from "../pages/member-role-page/update-page/member-role-update";
import { MemberRoleDeletePage } from "../pages/member-role-page/delete-page/member-role-delete";
import { EventListingPage } from "../pages/events-page/listing-page/events-listing";
import { EventCreatePage } from "../pages/events-page/create-page/events-create";
import { EventUpdatePage } from "../pages/events-page/update-page/events-update";
import App from "../components/calendar/calendar"


//import { ShoppingListUpdatePage } from "../pages/shopping-lists/update-page/shopping-list-update";
//This is where you will declare all of your routes (the ones that show up in the search bar)
export const routes = {
  root: `/`,
  home: `/home`,
  users: {
    listing: '/users',
    create: "/users/create",
    update: "/users/:id",
  },
  user: `/user`,
  calendar: '/calendar',
  mealTypes: {
    listing: '/meal-types',
    create: "/meal-types/create",
    update: "/meal-types/:id",
    delete: "/meal-types/delete/:id",
  },
  ingredients: {
    listing: '/ingredients',
    create: "/ingredients/create",
    update: "/ingredients/:id",
    delete: "/ingredients/delete/:id",
  },
  memberRoles:{
    listing: '/member-roles',
    create: "/member-roles/create",
    update: "/member-roles/:id",
    delete: "/member-roles/delete/:id"
  },
  recipes: {
    listing: '/recipes',
    create: "/recipes/create",
    update: "/recipes/:id",
    delete: "/recipes/delete/:id"
  },
  shoppingLists: {
    listing: '/shopping-lists',
    create: "/shopping-lists/create",
    update: "/shopping-lists/:id",
    delete: "/shopping-lists/delete/:id"
  },
  group:{
    listing: '/group',
    create: '/group/create',
    update: '/group/:id',
  },
  toDos: {
    listing: '/to-dos',
    create: "/to-dos/create",
    update: "/to-dos/:id",
  },
  units: {
    listing: '/units',
    create: '/units/create',
    update: '/units/:id',
    delete: '/units/delete/:id'
  },
  events: {
    listing: '/events',
    create: '/events/create',
    update: '/events/:id'
  },
};


//This is where you will tell React Router what to render when the path matches the route specified.
export const Routes = () => {
  //Calling the useUser() from the use-auth.tsx in order to get user information
  const user = useUser();
  return (
    <>
      {/* The page wrapper is what shows the NavBar at the top, it is around all pages inside of here. */}
      <PageWrapper user={user}>
        <Switch>
          {/* When path === / render LandingPage */}
          <Route path={routes.home} exact>
            <LandingPage />
          </Route>
          {/* When path === /iser render UserPage */}
          <Route path={routes.user} exact>
            <UserPage />
          </Route>
          {/* Going to route "localhost:5001/" will go to homepage */}
          <Route path={routes.root} exact>
            <Redirect to={routes.home} />
          </Route>
          <Route path={routes.calendar} exact>
            <App/>
          </Route>
          <Route path={routes.users.create} exact>
            <UsersCreatePage />
          </Route>
          <Route path={routes.users.listing} exact>
            <UsersListingPage />
          </Route>
          <Route path={routes.users.update} exact>
            <UsersUpdatePage />
          </Route>
          <Route path={routes.mealTypes.listing} exact>
            <MealTypeListingPage />
          </Route>
          <Route path={routes.mealTypes.create} exact>
            <MealTypeCreatePage />
          </Route>
          <Route path={routes.mealTypes.update} exact>
            <MealTypeUpdatePage />
          </Route>
          <Route path={routes.mealTypes.delete} exact>
            <MealTypeDeletePage />
          </Route>
          <Route path={routes.ingredients.listing} exact>
            <IngredientListingPage />
          </Route>
          <Route path={routes.ingredients.create} exact>
            <IngredientCreatePage />
          </Route>
          <Route path={routes.ingredients.update} exact>
            <IngredientUpdatePage />
          </Route>
          <Route path={routes.ingredients.delete} exact>
            <IngredientDeletePage />
          </Route>
          <Route path={routes.recipes.listing} exact>
            <RecipeListingPage />
          </Route>
          <Route path={routes.recipes.create} exact>
            <RecipeCreatePage />
          </Route>
          <Route path={routes.recipes.update} exact>
            <RecipeUpdatePage />
          </Route>
          <Route path={routes.recipes.delete} exact>
            <RecipeDeletePage />
          </Route>          
          <Route path={routes.group.listing} exact>
            <GroupListingPage />
          </Route>
          <Route path={routes.group.create} exact>
            <GroupCreatePage />
          </Route>
          <Route path={routes.group.update} exact>
            <GroupUpdatePage />
          </Route>     
          <Route path={routes.shoppingLists.create} exact>
            <ShoppingListCreatePage />
          </Route>
          <Route path={routes.shoppingLists.listing} exact>
            <ShoppingListListingPage />
          </Route>
          <Route path={routes.shoppingLists.update} exact>
            <ShoppingListUpdatePage />
          </Route> 
          <Route path={routes.units.listing} exact>
            <UnitListingPage />
          </Route>
          <Route path={routes.units.create} exact>
            <UnitCreatePage />
          </Route>
          <Route path={routes.units.update} exact>
            <UnitUpdatePage />
          </Route>
          <Route path={routes.units.delete} exact>
            <UnitDeletePage />
          </Route>
          <Route path={routes.shoppingLists.delete} exact>
            <ShoppingListDeletePage />
          </Route>
          <Route path={routes.toDos.listing} exact>
            <ToDoListingPage />
          </Route>
          <Route path={routes.toDos.create}exact>
            <ToDoCreatePage />
          </Route>
          <Route path={routes.toDos.update}exact>
            <ToDoUpdatePage />
          </Route>
          <Route path={routes.memberRoles.listing}exact>
            <MemberRoleListingPage />
          </Route>
          <Route path={routes.memberRoles.create}exact>
            <MemberRoleCreatePage />
          </Route>
          <Route path={routes.memberRoles.update}exact>
            <MemberRoleUpdatePage />
          </Route>
          <Route path={routes.memberRoles.delete}exact>
            <MemberRoleDeletePage />
          </Route>
          <Route path={routes.events.listing}>
            <EventListingPage/>
          </Route>
          <Route path={routes.events.create}>
            <EventCreatePage/>
          </Route>
          <Route path={routes.events.update}>
            <EventUpdatePage/>
          </Route>
          {/* This should always come last.  
            If the path has no match, show page not found */}
          <Route path="*" exact>
            <NotFoundPage />
          </Route>
        </Switch>
      </PageWrapper>
    </>
  );
};

