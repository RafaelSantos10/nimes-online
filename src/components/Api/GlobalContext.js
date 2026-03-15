import React, { useState } from "react";
import useFetch from "./useFetch";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const { request, data, error, loading } = useFetch();
  const [episodeId, setEpisodeId] = useState(
    localStorage.getItem("episodeAnimeIdLocal")
  );
  const [animeId, setAnimeId] = useState(localStorage.getItem("localAnimeId"));
  const [currentEpisodeTitle, setCurrentEpisodeTitle] = useState();
  const [description, setDescription] = useState(
    localStorage.getItem("LocalDescription") || ""
  );
  const [genres, setGenres] = useState(localStorage.getItem("LocalGenres") || "");
  const [animeTitle, setAnimeTitle] = useState(
    localStorage.getItem("LocalAnimeTitle") || ""
  );
  const [idImage, setIdImage] = useState(localStorage.getItem("ImageLocalId"));
  const [streamEpisodeVideo, setStreamEpisodeVideo] = useState();
  const [animeNameFormattedSearch, setAnimeNameFormattedSearch] = useState(
    localStorage.getItem("animeSearchName")
  );
  const [animeNameFormatted, setAnimeNameFormatted] = useState();
  const [category, setCategory] = useState();
  const [animeReleaseYear, setAnimeReleaseYear] = useState(
    localStorage.getItem("LocalAnimeReleaseYear") || ""
  );

  React.useEffect(() => {
    request("https://appanimeplus.tk/play-api.php?latest", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [request]);

  React.useEffect(() => {
    async function fetchAnimeId() {
      if (!animeNameFormatted) return;

      try {
        const response = await fetch(
          `https://appanimeplus.tk/play-api.php?search=${animeNameFormatted}`
        );
        if (!response.ok) return;

        const responseData = await response.json();
        if (Array.isArray(responseData) && responseData.length > 0) {
          setAnimeId(responseData[0].id);
          localStorage.setItem("localAnimeId", responseData[0].id);
        }
      } catch (_) {
        // no-op: mantém o estado anterior quando a API externa falha
      }
    }

    fetchAnimeId();
  }, [animeNameFormatted]);

  React.useEffect(() => {
    async function setInfosDesc() {
      if (!animeId) return;

      try {
        const response = await fetch(
          `https://appanimeplus.tk/play-api.php?info=${animeId}`
        );
        if (!response.ok) return;

        const responseData = await response.json();

        if (Array.isArray(responseData) && responseData.length > 0) {
          setDescription(responseData[0].category_description);
          setGenres(responseData[0].category_genres);
          setAnimeTitle(responseData[0].category_name);
          setAnimeReleaseYear(responseData[0].ano);
          localStorage.setItem("LocalDescription", responseData[0].category_description);
          localStorage.setItem("LocalGenres", responseData[0].category_genres);
          localStorage.setItem("LocalAnimeTitle", responseData[0].category_name);
          localStorage.setItem("LocalAnimeReleaseYear", responseData[0].ano);
        }
      } catch (_) {
        // no-op: mantém o estado anterior quando a API externa falha
      }
    }

    setInfosDesc();
  }, [animeId]);

  return (
    <GlobalContext.Provider
      value={{
        data,
        error,
        loading,
        episodeId,
        setEpisodeId,
        currentEpisodeTitle,
        setCurrentEpisodeTitle,
        description,
        setDescription,
        genres,
        setGenres,
        animeTitle,
        setAnimeTitle,
        animeId,
        setAnimeId,
        idImage,
        setIdImage,
        streamEpisodeVideo,
        setStreamEpisodeVideo,
        animeNameFormattedSearch,
        setAnimeNameFormattedSearch,
        category,
        setCategory,
        animeNameFormatted,
        setAnimeNameFormatted,
        animeReleaseYear,
        setAnimeReleaseYear,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
