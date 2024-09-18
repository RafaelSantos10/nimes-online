import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { GlobalContext } from "../Api/GlobalContext";
import styles from "./Custom.module.css";

function VideoDescription({ visibility }) {
  const Global = React.useContext(GlobalContext);

  if(Global.description)
  return (
    <>
      <Container
        style={{
          display: `${visibility}`,
        }}
        className={styles.ContainerMain}
      >
        <div className={styles.splitContainer}>
          <div className={styles.rightContainer}>
            <span className={styles.rightContainerText}>
              {Global.animeTitle}
            </span>
          </div>
          <div>
            <span styles={{ fontSize: ".875rem" }}>
              {" "}
              {Global.animeReleaseYear}
            </span>
          </div>
        </div>

        <h2>{Global.currentEpisodeTitle}</h2>
        <h3> {Global.category_genres}</h3>

        <p>{` ${Global.description.substring(0, 424)}`}...</p>
      </Container>
    </>
  );
}

export default VideoDescription;
