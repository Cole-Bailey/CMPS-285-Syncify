import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApiResponse, GroupMemberGetDto } from "../../../constants/types";
import { BaseUrl } from "../../../constants/env-cars";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { routes } from "../../../routes/config";
import { useHistory } from "react-router-dom";
import "./group-members-listing.css";

export const GroupMembersListingPage = () => {
  const [groupMembers, setGroupMembers] = useState<GroupMemberGetDto[]>();
  const history = useHistory();

  useEffect(() => {
    const fetchGroupMembers = async () => {
      const response = await axios.get<ApiResponse<GroupMemberGetDto[]>>(
        `${BaseUrl}/api/group-members`
      );
      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setGroupMembers(response.data.data);
      }
    };

    fetchGroupMembers();
  }, []);

  return (
    <>
      {groupMembers && (
        <>
          <Header>Group Members</Header>

          <Button
            type="button"
            onClick={() => history.push(routes.groupMembers.create)}
          >
            + Create
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Edit Name</Table.HeaderCell>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Member Role</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Group</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {groupMembers.map((groupMembers) => {
                return (
                  <Table.Row key={groupMembers.id}>
                    <Table.Cell>
                      <Icon
                        link
                        name="pencil"
                        onClick={() =>
                          history.push(
                            routes.groupMembers.update.replace(
                              ":id",
                              `${groupMembers.id}`
                            )
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{groupMembers.id}</Table.Cell>
                    <Table.Cell>{groupMembers.memberRole.name}</Table.Cell>
                    <Table.Cell>{groupMembers.user.username}</Table.Cell>
                    <Table.Cell>{groupMembers.group.name}</Table.Cell>
                    <Table.Cell>
                      <Button
                        color="red"
                        type="Button"
                        onClick={() =>
                          history.push(
                            routes.groupMembers.delete.replace(
                              ":id",
                              `${groupMembers.id}`
                            )
                          )
                        }
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </>
      )}
    </>
  );
};
