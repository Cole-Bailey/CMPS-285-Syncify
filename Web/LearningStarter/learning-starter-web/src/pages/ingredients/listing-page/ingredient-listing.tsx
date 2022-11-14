import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, IngredientGetDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";

export const IngredientListingPage = () => {
  const [ingredients, setIngredients] = useState<IngredientGetDto[]>();
  const history = useHistory();

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await axios.get<ApiResponse<IngredientGetDto[]>>(
        `${BaseUrl}/api/ingredients`
      );

      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setIngredients(response.data.data);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <Segment>
      {ingredients && (
        <>
          <Header>Ingredients</Header>
          <Button
            type="button"
            onClick={() => history.push(routes.ingredients.create)}
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
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ingredients.map((ingredient) => {
                return (
                  <Table.Row key={ingredient.id}>
                    <Table.Cell>
                      <Icon
                        link
                        name="pencil"
                        onClick={() =>
                          history.push(
                            routes.ingredients.update.replace(
                              ":id",
                              `${ingredient.id}`
                            )
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{ingredient.id}</Table.Cell>
                    <Table.Cell>{ingredient.name}</Table.Cell>
                    <Table.Cell>{ingredient.image}</Table.Cell>
                    <Table.Cell>
                      <Icon
                        link
                        name="trash"
                        onClick={() =>
                          history.push(
                            routes.ingredients.delete.replace(
                              ":id",
                              `${ingredient.id}`
                            )
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
