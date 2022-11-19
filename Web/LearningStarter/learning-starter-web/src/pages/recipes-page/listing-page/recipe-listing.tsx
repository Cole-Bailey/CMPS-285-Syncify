import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, RecipeGetDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import "./recipe-listing.css";

export const RecipeListingPage = () => {
  const [recipes, setRecipes] = useState<RecipeGetDto[]>();
  const history = useHistory();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get<ApiResponse<RecipeGetDto[]>>(
        `${BaseUrl}/api/recipes`
      );

      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setRecipes(response.data.data);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Segment className="indexing">
      {recipes && (
        <>
          <Header>Recipes</Header>
          <Button
            type="button"
            onClick={() => history.push(routes.recipes.create)}
          >
            + Create
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Edit</Table.HeaderCell>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Servings</Table.HeaderCell>
                <Table.HeaderCell>Directions</Table.HeaderCell>
                <Table.HeaderCell>Meal Type</Table.HeaderCell>
                <Table.HeaderCell>Calendar</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {recipes.map((recipe) => {
                return (
                  <Table.Row key={recipe.id}>
                    <Table.Cell>
                      <Icon
                        link
                        name="pencil"
                        onClick={() =>
                          history.push(
                            routes.recipes.update.replace(":id", `${recipe.id}`)
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{recipe.id}</Table.Cell>
                    <Table.Cell>{recipe.name}</Table.Cell>
                    <Table.Cell>{recipe.image}</Table.Cell>
                    <Table.Cell>{recipe.servings}</Table.Cell>
                    <Table.Cell>{recipe.directions}</Table.Cell>
                    <Table.Cell>{recipe.mealType.name}</Table.Cell>
                    <Table.Cell>{recipe.calendar.group.name}</Table.Cell>
                    <Table.Cell>
                      <Icon
                        link
                        name="trash"
                        onClick={() =>
                          history.push(
                            routes.recipes.delete.replace(":id", `${recipe.id}`)
                          )
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      )}
    </Segment>
  );
};
