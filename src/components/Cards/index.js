import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Ratio } from "react-bootstrap";
import { GlobalContext } from "../Api/GlobalContext";
import SpinnerComponent from "../Spinner";
import { Link } from "react-router-dom";
import styles from "./Custom.module.css";

function Cards() {
  const Global = React.useContext(GlobalContext);

  if (Global.data === null &&  Global.loading === null)  return null;
  return (
    <>
    {
      Global.loading ? <SpinnerComponent/> :  Global.data.map((data, index) => (
        <Col key={index} xs={6} md={2}>
          <Link
           to="video"
            style={{ textDecoration: "none", color: "#f2f2f2" }}
            onClick={function (e) {
              localStorage.setItem("ImageLocalId", data.category_image);
              Global.setEpisodeId(data.video_id);
              Global.setIdImage(data.category_image);
              localStorage.setItem("episodeAnimeIdLocal", data.video_id);
              
            }}
          >
            <Card
              className={styles.cardsCustom}
              variant="dark"
            >
              <Ratio aspectRatio="1x1">
                <Card.Img
                  src={`https://cdn.appanimeplus.tk/img/${data.category_image}`}
                  alt={data.title}
                />
              </Ratio>
              <Card.Body>
                <Card.Title className={styles.cardTitleCustom}>
                  {data.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    
     
    </>
  );
}

export default Cards;
