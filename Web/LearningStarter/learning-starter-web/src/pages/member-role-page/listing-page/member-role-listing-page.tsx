import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, MemberRoleGetDto } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import "./member-role-listing.css";

export const MemberRoleListingPage = () => {
  const [memberRoles, setMemberRoles] = useState<MemberRoleGetDto[]>();
  const history = useHistory();

  const goHome = () => {
    history.push(routes.home);
  };

  useEffect(() => {
    const fetchMemberRoles = async () => {
      const response = await axios.get<ApiResponse<MemberRoleGetDto[]>>(
        `${BaseUrl}/api/member-roles`
      );

      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setMemberRoles(response.data.data);
      }
    };

    fetchMemberRoles();
  }, []);

  return (
    <>
      {memberRoles && (
        <>
          <Header>Member Roles</Header>
          <Button
            type="button"
            onClick={() => history.push(routes.memberRoles.create)}
          >
            + Create
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1} />
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {memberRoles.map((memberRole) => {
                return (
                  <Table.Row key={memberRole.id}>
                    <Table.Cell>
                      <Icon
                        link
                        name="pencil"
                        onClick={() =>
                          history.push(
                            routes.memberRoles.update.replace(
                              ":id",
                              `${memberRole.id}`
                            )
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{memberRole.id}</Table.Cell>
                    <Table.Cell>{memberRole.name}</Table.Cell>
                    <Table.Cell>
                      <Icon
                        link
                        name="trash"
                        onClick={() =>
                          history.push(
                            routes.memberRoles.delete.replace(
                              ":id",
                              `${memberRole.id}`
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
      <Button onClick={goHome}>Home</Button>
    </>
  );
};
