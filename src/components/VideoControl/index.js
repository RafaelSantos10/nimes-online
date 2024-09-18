import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { HiArrowSmLeft } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import styles from "./Custom.module.css";
import { GlobalContext } from "../Api/GlobalContext";

function VideoControl() {
  const Global = React.useContext(GlobalContext);

  function changeEpisode(data) {
    if (data === null) return null;
    Global.setEpisodeId(data[0].video_id);
  }
  async function nextEpisode() {
    const responseData = await fetch(
      `https://appanimeplus.tk/play-api.php?episodios=${Global.episodeId}&catid=${Global.animeId}&next`
    );
    const jsonData = await responseData.json();

    changeEpisode(jsonData);
  }

  async function preventEpisode() {
    const responseData = await fetch(
      `https://appanimeplus.tk/play-api.php?episodios=${Global.episodeId}&catid=${Global.animeId}&previous`
    );
    const jsonData = await responseData.json();
    changeEpisode(jsonData);
  }

  return (
    <>
      <Container>
        <ButtonGroup
          size="lg"
          className={`${styles.ButtonGroupCustom} mb-2`}
        
        >
          <Button variant="outline-secondary" onClick={preventEpisode}>
            <h3>
              <HiArrowSmLeft />
            </h3>
          </Button>
          <a
            href={"/anime"}
           className={styles.linkCustom}
          >
            <Button
              variant="outline-secondary"
             className={styles.buttonCustom}
            >
              Todos os Episódios
            </Button>
          </a>
          <Button variant="outline-secondary" onClick={nextEpisode}>
            <h3>
              <HiArrowSmRight />
            </h3>
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
}
export default VideoControl;
