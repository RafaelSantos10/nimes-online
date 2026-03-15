import React, { useMemo, useState } from "react";
import ReactPlayer from "react-player";
import Container from "react-bootstrap/Container";
import useFetch from "../../Api/useFetch";
import VideoDescription from "../../VideoDescription";
import VideoControl from "../../VideoControl";
import { GlobalContext } from "../../Api/GlobalContext";

function Video() {
  const { request, data } = useFetch();
  const [link, setLink] = useState();
  const {
    episodeId,
    setCurrentEpisodeTitle,
    setAnimeNameFormatted,
    animeNameFormatted,
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (!episodeId) return;

    request(`https://appanimeplus.tk/play-api.php?episodios=${episodeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [episodeId, request]);

  React.useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;

    setLink(data[0].locationsd || data[0].location);

    const rawTitle = data[0].title || "";
    setCurrentEpisodeTitle(rawTitle);

    let normalizedTitle = rawTitle
      .replace(/[^a-zA-Z 0-9]+/gm, "_")
      .replace(/\s+/g, "_")
      .replace(/.Ep[a-zA-Z]+...../gm, "")
      .toLowerCase();

    if (rawTitle.length > 50) {
      const [first = "", second = ""] = rawTitle.split(" ");
      normalizedTitle = `${first} ${second}`
        .replace(/[^a-zA-Z 0-9]+/gm, "_")
        .replace(/\s+/g, "_")
        .replace(/.Ep[a-zA-Z]+...../gm, "")
        .toLowerCase();
    }

    setAnimeNameFormatted(normalizedTitle);
  }, [data, setAnimeNameFormatted, setCurrentEpisodeTitle]);

  const animName = useMemo(() => animeNameFormatted || "", [animeNameFormatted]);

  if (data === null || link === undefined) return null;

  return (
    <>
      <Container style={{ marginTop: "8rem" }}>
        <ReactPlayer playing={false} width="100%" controls={true} url={link} />
        <VideoControl />
      </Container>
      <Container>
        <VideoDescription animName={animName} />
      </Container>
    </>
  );
}

export default Video;
