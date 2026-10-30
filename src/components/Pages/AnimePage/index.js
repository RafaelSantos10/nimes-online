import { validId, API_URL, IMAGE_URL } from "../../Api/config";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Api/GlobalContext";
import useFetch from "../../Api/useFetch";
import SpinnerComponent from "../../Spinner";
import Styles from "./Custom.module.css";

function AnimePage() {
  const { request, data, loading, error } = useFetch();
  const Global = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!validId(Global.animeId)) return;

    request(`${API_URL}?cat_id=${Global.animeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [Global.animeId, request]);

  if (error) return <p role="alert" style={{ margin: "8rem 1rem 2rem" }}>{error}</p>;
  if (Global.genres === null && Global.description === null && loading === null) {
    return null;
  }

  return (
    <>
      <Container className={Styles.containerMain}>
        <Row>
          <Col md="auto">
            <img
              alt={Global.animeTitle}
              src={`${IMAGE_URL}/${Global.idImage}`}
            />
          </Col>
          <Col className={Styles.animeTitle}>
            <h1>{Global.animeTitle}</h1>
            <span>{Global.genres}</span>
            <div>
              <p>{Global.description}</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        {loading ? (
          <SpinnerComponent />
        ) : (
          Array.isArray(data) &&
          data.map((item) => {
            return (
              <Link
                to="/video"
                className={Styles.linkStyle}
                key={item.video_id}
                onClick={function () {
                  Global.setEpisodeId(item.video_id);
                }}
              >
                <Card border="warning" bg="dark" text="light">
                  <Card.Body>
                    <h4>{item.title}</h4>
                  </Card.Body>
                </Card>
              </Link>
            );
          })
        )}
      </Container>
    </>
  );
}

export default AnimePage;
