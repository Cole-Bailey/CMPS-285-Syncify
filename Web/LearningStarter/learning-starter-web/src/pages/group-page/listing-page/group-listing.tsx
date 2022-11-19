import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, GroupGetDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import "./group-listing.css";

export const GroupListingPage = () => {
  const [groups, setGroup] = useState<GroupGetDto[]>();
  const history = useHistory();

  const goHome = () => {
    history.push(routes.home);
  };

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await axios.get<ApiResponse<GroupGetDto[]>>(
        `${BaseUrl}/api/groups`
      );
      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setGroup(response.data.data);
      }
    };

    fetchGroup();
  }, []);

  return (
    <Segment className="indexing">
      {groups && (
        <>
          <Header>Groups</Header>
          <Button
            type="button"
            onClick={() => history.push(routes.group.create)}
          >
            + Create
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {groups.map((group) => {
                return (
                  <Table.Row key={group.id}>
                    <Table.Cell>
                      <Icon
                        link
                        name="pencil"
                        onClick={() =>
                          history.push(
                            routes.mealTypes.update.replace(
                              ":id",
                              `${group.id}`
                            )
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{group.id}</Table.Cell>
                    <Table.Cell>{group.name}</Table.Cell>
                    <Table.Cell>{group.image}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      )}
      <Button onClick={goHome}>Home</Button>
    </Segment>
  );
};
