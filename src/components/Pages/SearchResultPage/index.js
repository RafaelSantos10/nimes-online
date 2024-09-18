import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Container, Figure, Ratio, Row } from "react-bootstrap";
import SpinnerComponent from "../../Spinner";
import { GlobalContext } from "../../Api/GlobalContext";
import useFetch from "../../Api/useFetch";
import imageError from "../../../assets/img/errorPhoto.jpg";
import styles from "./Custom.module.css";

function SearchResultPage() {
  const Global = React.useContext(GlobalContext);
  const { request, data, loading, error, setError } = useFetch();

  React.useEffect(() => {
    request(
      `https://appanimeplus.tk/play-api.php?search=${Global.animeNameFormattedSearch}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }, [Global.animeNameFormattedSearch]);

  if (data || error)
    return (
      <>
        <Container style={{ marginTop: "7rem" }}>
          <Row>
            <Col>
              <h1 style={{ color: "#FAD82D" }}>Resultados para a busca:</h1>
            </Col>
          </Row>
        </Container>

        {error ? (
          <Container className={styles.containerResult}>
            <Figure>
              <Figure.Image
                width={342}
                height={360}
                alt="342x360"
                src={imageError}
                className={styles.containerErrorImg}
              />
            </Figure>
            <div>
              <h5>
                {" "}
                Nenhum resultado encontrado para{" "}
                <span>{`"${Global.animeNameFormattedSearch}"`}</span>, verifique
                o nome digitado e tente novamente.
              </h5>
            </div>
          </Container>
        ) : (
          <Container className={styles.containerResult}>
            <Row>
              {loading ? (
                <SpinnerComponent />
              ) : (
                data.map((data, index) => (
                  <Col key={index} xs={6} md={2}>
                    <a
                      href={"/anime"}
                      className={styles.linkCustom}
                      onClick={function (e) {
                        Global.setAnimeId(data.id);
                        localStorage.setItem("localAnimeId", data.id);
                        Global.setAnimeTitle(data.category_name);
                        localStorage.setItem(
                          "LocalAnimeTitle",
                          data.category_name
                        );
                        Global.setIdImage(data.category_image);
                        localStorage.setItem(
                          "ImageLocalId",
                          data.category_image
                        );
                      }}
                    >
                      <Card className={styles.cardCustom} variant="dark">
                        <Ratio aspectRatio="1x1">
                          <Card.Img
                            src={`https://cdn.appanimeplus.tk/img/${data.category_image}`}
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
        )}
      </>
    );
}

export default SearchResultPage;
