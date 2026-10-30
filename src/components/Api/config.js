export const API_URL = process.env.REACT_APP_API_URL || "https://appanimeplus.tk/play-api.php";
export const IMAGE_URL = (process.env.REACT_APP_IMAGE_URL || "https://cdn.appanimeplus.tk/img").replace(/\/$/, "");
export const API_ERROR = "Não foi possível carregar os dados. O serviço está indisponível. Tente novamente mais tarde.";

export function validId(value) {
  return value != null && /^\d+$/.test(String(value)) && Number(value) > 0;
}
