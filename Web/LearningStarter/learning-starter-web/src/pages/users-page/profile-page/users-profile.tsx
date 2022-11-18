import React from "react";
import { useUser } from "../../../authentication/use-auth";
import { Segment, SegmentGroup } from "semantic-ui-react";
import "../profile-page/users-profle.css";

export const UsersProfilePage = () => {
  const user = useUser();
  const sizes = ["mini", "tiny", "small", "large", "big", "huge", "massive"];
  return (
    <div>
      {sizes.map((size) => (
        <SegmentGroup textAlign="left">
          <Segment key={size} size={"huge"} textAlign="center">
            User Information
          </Segment>
          <SegmentGroup>
            <Segment textAlign="center" size="small">
              Profile Color Name
            </Segment>
            <p>{user.profileColor.colors}</p>

            <Segment size="small">First Name</Segment>
            <p>{user.firstName}</p>

            <Segment size="small">Last Name</Segment>
            <p>{user.lastName}</p>

            <Segment size="small">User Name</Segment>
            <p>{user.username}</p>

            <Segment size="small">Phone Number</Segment>
            <p>{user.phoneNumber}</p>

            <Segment size="small">Email</Segment>
            <p>{user.email}</p>

            <Segment size="small">Birthday</Segment>
            <p>{user.birthday}</p>
          </SegmentGroup>
        </SegmentGroup>
      ))}
    </div>
  );
};
