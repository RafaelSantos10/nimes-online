import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      json = await response.json();

      if (json === null || (Array.isArray(json) && json.length === 0)) {
        setError("Error");
      }
    } catch (erro) {
      json = null;
      setError("Error");
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return { data, setData, error, loading, request, setError };
};

export default useFetch;
