import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { citiesStore } from "../store/cities";
import LocationCard from "./LocationCard";
import LocationPicker from "./LocationPicker";

interface LocationsProps {}

export const Locations: React.FC<LocationsProps> = () => {
  const cityOne = citiesStore().cityOne;
  const cityTwo = citiesStore().cityTwo;
  return (
    <div className="selection-wrapper">
      <Container>
        <Row className="justify-content-md-center">
          <Col md lg="8">
            <LocationPicker />
          </Col>
        </Row>
        <Row className="mt-3 center-block">
          {cityOne && (
            <Col className={!cityTwo ? "col-md col-lg-12" : "col-md col-md-6"}>
              <LocationCard city={cityOne} />
            </Col>
          )}
          {cityTwo && (
            <Col className="col-md col-md-6">
              <LocationCard city={cityTwo} />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Locations;
