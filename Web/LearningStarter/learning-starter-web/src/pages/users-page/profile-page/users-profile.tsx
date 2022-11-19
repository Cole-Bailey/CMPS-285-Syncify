import React from "react";
import { useUser } from "../../../authentication/use-auth";
import { Header, Container, Divider } from "semantic-ui-react";
import "./users-profle.css";

export const UsersProfilePage = () => {
  const user = useUser();
  return (
    <div>
      <div>
        <Container className="users-profile-page-container" textAlign="left">
          <Header textAlign="center">User Information</Header>

          <Header size="small">Profile Color Name</Header>
          <p background-color="user.profileColor.colors">
            {user.profileColor.colors}
          </p>
          <Divider />
          <Header size="small">First Name</Header>
          <p>{user.firstName}</p>
          <Divider />
          <Header size="small">Last Name</Header>
          <p>{user.lastName}</p>
          <Divider />
          <Header size="small">User Name</Header>
          <p>{user.username}</p>
          <Divider />
          <Header size="small">Phone Number</Header>
          <p>{user.phoneNumber}</p>
          <Divider />
          <Header size="small">Email</Header>
          <p>{user.email}</p>
          <Divider />
          <Header size="small">Birthday</Header>
          <p>{user.birthday}</p>
          <Divider />
        </Container>
      </div>
    </div>
  );
};
