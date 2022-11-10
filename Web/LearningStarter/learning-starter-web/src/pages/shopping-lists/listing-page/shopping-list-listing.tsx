import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, ShoppingListGetDto } from "../../../constants/types";
import {useHistory} from "react-router-dom";
import { routes } from "../../../routes/config";
import "./shopping-list-listing.css";

export const ShoppingListListingPage = () => {
  const [shoppingLists, setShoppingList] = useState<ShoppingListGetDto[]>();
  const history = useHistory();


  useEffect(() => {
    const fetchShoppingList = async () => {
      const response = await axios.get<ApiResponse<ShoppingListGetDto[]>>(
        `${BaseUrl}/api/shopping-lists`
      );
      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setShoppingList(response.data.data);
      }
    };

    fetchShoppingList();
  }, []);

  return (
    <Segment>
    <Header>Shopping List Items</Header>   
      {shoppingLists && (
      <>
            <Button type="button" onClick={() => history.push(routes.shoppingLists.create)}>+ Create</Button>
            <Table striped celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width= {1}>Edit Item</Table.HeaderCell>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Delete Item</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {shoppingLists.map((shoppingList) => {
                    return (
                    <Table.Row key={shoppingList.id}>
                    <Table.Cell>
                        <Icon
                            link
                            name="pencil"
                            onClick={() =>
                            history.push(
                                routes.shoppingLists.update.replace(":id", `${shoppingList.id}`)
                            )
                        }
                        />
                    </Table.Cell>
                    <Table.Cell>{shoppingList.id}</Table.Cell>
                    <Table.Cell>{shoppingList.name}</Table.Cell>
                    <Table.Cell>
                      <Button color="red" type="Button" onClick={() => 
                        history.push(routes.shoppingLists.delete.replace(
                          ":id", `${shoppingList.id}`))}> Delete </Button>
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