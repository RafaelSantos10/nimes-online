import React from "react";
import { Card, Col, Container, Ratio, Row } from "react-bootstrap";
import { GlobalContext } from "../../Api/GlobalContext";
import useFetch from "../../Api/useFetch";
import Label from "../../Overlay";
import SpinnerComponent from "../../Spinner";
import styles from "./Custom.module.css";

function Category() {
  const Global = React.useContext(GlobalContext);
  const { request, data, loading } = useFetch();

  React.useEffect(() => {
    if (!Global.category) return;

    request(`https://appanimeplus.tk/play-api.php?categoria=${Global.category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [Global.category, request]);

  if (data === null && loading === null) return null;

  return (
    <Container className={styles.containerMain}>
      <Label text={`${Global.category}s`} />
      <Row className={styles.containerMainRow}>
        {loading ? (
          <SpinnerComponent />
        ) : (
          Array.isArray(data) &&
          data.map((data, index) => (
            <Col key={index} xs={6} md={2}>
              <a
                href="/anime"
                className={styles.linkCustom}
                onClick={function () {
                  Global.setAnimeId(data.id);
                  localStorage.setItem("localAnimeId", data.id);
                  Global.setIdImage(data.category_image);
                  localStorage.setItem("ImageLocalId", data.category_image);
                  Global.setAnimeTitle(data.category_name);
                  localStorage.setItem("LocalAnimeTitle", data.category_name);
                }}
              >
                <Card className={styles.cardCustom} variant="dark">
                  <Ratio aspectRatio="1x1">
                    <Card.Img
                      src={`https://cdn.appanimeplus.tk/img/${data.category_image}`}
                      alt={data.category_name}
                    />
                  </Ratio>
                  <Card.Body>
                    <Card.Title className={styles.cardCustomTitle}>
                      {data.category_name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Category;
