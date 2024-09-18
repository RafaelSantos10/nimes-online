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
    request(`https://appanimeplus.tk/play-api.php?cat_id=${Global.animeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [Global.animeId]);

  if (Global.genres === null && Global.description === null && loading === null)
    return null;
  if (data !== null) {
    return (
      <>
        <Container className={Styles.containerMain}>
          <Row>
            <Col md="auto">
              <img alt={Global.animeTitle} src={`https://cdn.appanimeplus.tk/img/${Global.idImage}`} />
              
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
            data.map((item) => {
              return (
                <Link
                  to={"/video"}
                  className={Styles.linkStyle}
                  key={item.video_id}
                  onClick={function (e) {
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
}

export default AnimePage;
