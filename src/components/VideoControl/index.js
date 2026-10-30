import { API_URL, API_ERROR, validId } from "../Api/config";
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

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function changeEpisode(direction) {
    if (!validId(Global.episodeId) || !validId(Global.animeId)) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?episodios=${Global.episodeId}&catid=${Global.animeId}&${direction}`
      );
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      if (!Array.isArray(data) || !data.length || !validId(data[0]?.video_id)) {
        setError("Nenhum episódio disponível nesta direção.");
        return;
      }
      Global.setEpisodeId(data[0].video_id);
      localStorage.setItem("episodeAnimeIdLocal", data[0].video_id);
    } catch (_) {
      setError(API_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        {error && <p role="alert">{error}</p>}
        <ButtonGroup
          size="lg"
          className={`${styles.ButtonGroupCustom} mb-2`}
        
        >
          <Button variant="outline-secondary" disabled={loading} onClick={() => changeEpisode("previous")}>
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
          <Button variant="outline-secondary" disabled={loading} onClick={() => changeEpisode("next")}>
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
