import React, { useEffect, useState } from "react";
import { Col, Row, Spinner, Toast } from "react-bootstrap";
import { titleCase } from "title-case";
import { City, CityReadings } from "../api/models";
import "./LocationCard.scss";
import rest, { RestQueryResult } from "../utils/rest";
import moment from "moment";

interface LocationCardProps {
  city: City;
}

export const LocationCard: React.FC<LocationCardProps> = ({ city }) => {
  const [loading, setLoading] = useState(true);
  const [cityInfo, setCityInfo] = useState<CityReadings>();
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const loadCityReadings = async () => {
      setLoading(true);
      try {
        //ADMIN NOTE - Just add an extra "s" to the end of this url below to see error handling
        const { results } = (await rest.get("/v2/locations", {
          params: {
            country: "US",
            city: city.city
          }
        })) as RestQueryResult<CityReadings>;
        setCityInfo(results[0]);
        setLoading(false);
      } catch (e) {
        setFetchError(true);
        setLoading(false);
        console.log("caught", e);
      }
    };
    loadCityReadings();
  }, [city]);
  return (
    <>
      <Toast show={fetchError} onClose={() => setFetchError(false)}>
        <Toast.Header>
          <strong className="mr-auto red">Error fetching results.</strong>
        </Toast.Header>
        <Toast.Body>Unable to retrieve results for {city.city}</Toast.Body>
      </Toast>
      {loading && (
        <Spinner animation="grow" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {!loading && cityInfo && (
        <div
          style={{
            backgroundColor: "lightblue",
            borderRadius: 25,
            padding: 15
          }}
        >
          <h2>{titleCase(cityInfo.city.toLowerCase())}</h2>
          <h3 className="gray-text mb-3">Location ID {cityInfo.id}</h3>
          {cityInfo.parameters.map(p => (
            <Row key={p.id} className="mt-1">
              <Col sm lg="3">
                <h5>
                  <span className="gray-text">Type:</span>&nbsp;{p.displayName}
                </h5>
              </Col>
              <Col sm lg="4">
                <h5>
                  {p.lastValue} &nbsp;{" "}
                  <span className="gray-text">
                    {moment(p.lastUpdated).fromNow()}
                  </span>
                </h5>
              </Col>
              <Col sm lg="3">
                <h5>
                  <span className="gray-text">Avgerage:</span>&nbsp;
                  {p.average.toPrecision(3)}
                </h5>
              </Col>
            </Row>
          ))}
          <Row className="mt-3">
            <Col md lg="3">
              <h5 className="gray-text bolder">Sources: </h5>
            </Col>
            <Col md lg="9">
              <ul>
                {cityInfo.sources.map(s => (
                  <li key={s.id}>
                    {s.url && (
                      <a className="h5" href={s.url}>
                        {s.name}
                      </a>
                    )}
                    {!s.url && <h5>{s.name}</h5>}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default LocationCard;
