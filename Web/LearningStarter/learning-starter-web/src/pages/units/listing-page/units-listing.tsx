import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { BaseUrl } from "../../../constants/env-cars";
import { ApiResponse, UnitGetDto } from "../../../constants/types";
import {useHistory} from "react-router-dom";
import { routes } from "../../../routes/config";

export const UnitListingPage = () => {
  const [units, setUnit] = useState<UnitGetDto[]>();
  const history = useHistory();


  useEffect(() => {
    const fetchUnit = async () => {
      const response = await axios.get<ApiResponse<UnitGetDto[]>>(
        `${BaseUrl}/api/units`
      );
      if (response.data.hasErrors) {
        response.data.errors.forEach((err) => {
          console.log(err.message);
        });
      } else {
        setUnit(response.data.data);
      }
    };

    fetchUnit();
  }, []);

  return (
    <Segment>
      {units && (
      <>
      <Header>Units</Header>
            <Button type="button" onClick={() => history.push(routes.units.create)}>+ Create</Button>
            <Table striped celled>
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell width= {1}>Edit Unit</Table.HeaderCell>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Abbreviation</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {units.map((unit) => {
                    return (
                    <Table.Row key={unit.id}>
                    <Table.Cell>
                        <Icon
                            link
                            name="pencil"
                            onClick={() =>
                            history.push(
                                routes.units.update.replace(":id", `${unit.id}`)
                            )
                        }
                        />
                    </Table.Cell>
                    <Table.Cell>{unit.id}</Table.Cell>
                    <Table.Cell>{unit.name}</Table.Cell>
                    <Table.Cell>{unit.abbreviation}</Table.Cell>
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