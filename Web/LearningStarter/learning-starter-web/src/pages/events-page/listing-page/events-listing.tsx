import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { ApiResponse, EventGetDto } from "../../../constants/types";
import { BaseUrl } from "../../../constants/env-cars";
import { useHistory } from "react-router-dom";
import { routes } from "../../../routes/config";
import "./events-listing.css";
import { PageWrapper } from "../../../components/page-wrapper/page-wrapper";

export const EventListingPage = () => {
  const [events, setEvents] = useState<EventGetDto[]>();
  const history = useHistory();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get<ApiResponse<EventGetDto[]>>(
        `${BaseUrl}/api/events`
      );

      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setEvents(response.data.data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {events && (
        <>
          <Header>Events</Header>
          <Button
            type="button"
            onClick={() => history.push(routes.events.create)}
          >
            + Create
          </Button>
          <Table striped celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Edit</Table.HeaderCell>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Event Details</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Group Calendar</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {events.map((event) => {
                return (
                  <Table.Row key={event.id}>
                    <Table.Cell>
                      <Icon
                        link
                        name="pencil"
                        onClick={() =>
                          history.push(
                            routes.events.update.replace(":id", `${event.id}`)
                          )
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>{event.id}</Table.Cell>
                    <Table.Cell>{event.name}</Table.Cell>
                    <Table.Cell>{event.eventDetails}</Table.Cell>
                    <Table.Cell>{event.createdDate}</Table.Cell>
                    <Table.Cell>{event.calendar.group.name}</Table.Cell>
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

//     <>
//         {events ? (
//           events.map((events) => {
//             return (
//               <Segment>
//                 <div>CalenderId: {events.calendar}</div>
//                 <div>Id: {events.id}</div>
//                 <div>Title: {events.name}</div>
//                 <div>Description: {events.eventDetails}</div>
//               </Segment>
//             );
//           })
//         ) : (
//           <div>Loading</div>
//         )}
//       </div>
//     </>
//   );
// };
