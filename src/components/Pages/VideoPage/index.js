import React, { useState } from "react";
import ReactPlayer from "react-player";
import Container from "react-bootstrap/Container";
import useFetch from "../../Api/useFetch";
import VideoDescription from "../../VideoDescription";
import VideoControl from "../../VideoControl";
import { GlobalContext } from "../../Api/GlobalContext";

function Video() {
  const { request, data } = useFetch();
  const [link, setLink] = useState();
  let animTitleForm;
  const Global = React.useContext(GlobalContext);

  React.useEffect(() => {
    function callInfos(id) {
      if (Global.episodeId === null) return null;
      request(`https://appanimeplus.tk/play-api.php?episodios=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data !== null) 
      data[0].locationsd ? setLink(data[0].locationsd) : setLink(data[0].location);
      
    }

    callInfos(Global.episodeId);
  }, [Global, setLink]);

  async function setTitleForm() {
    if (data !== null) {
      Global.setCurrentEpisodeTitle(data[0].title);
      let animTitle = data[0].title;
      animTitleForm = animTitle
        .replace(/[^a-zA-Z 0-9]+/gm, "_")
        .replace(/\s+/g, "_")
        .replace(/.Ep[a-zA-Z]+...../gm, "")
        .toLowerCase();

      if (animTitle.length > 50) {
        let tmp = animTitle.split(" ");
        animTitle = tmp[0] + (" ") + tmp[1];
        animTitleForm = animTitle
        .replace(/[^a-zA-Z 0-9]+/gm, "_")
        .replace(/\s+/g, "_")
        .replace(/.Ep[a-zA-Z]+...../gm, "")
        .toLowerCase();
      }
     
      Global.setAnimeNameFormatted(animTitleForm);
    }
  }
  setTitleForm();
  if (data === null || link === undefined) return null;
  return (
    <>
      <Container style={{ marginTop: "8rem" }}>
        <ReactPlayer
          playing={false}
          width={"100%"}
          controls={true}
          url={link}
        />
        <VideoControl />
      </Container>
      <Container>
        <VideoDescription animName={animTitleForm} />
      </Container>
    </>
  );
}

export default Video;
