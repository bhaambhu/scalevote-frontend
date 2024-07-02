const API_URL_LIVE = "https://scalevote.up.railway.app/api-docs.html";
const API_URL_LOCAL = "http://localhost:8080/api";
export const BASE_URL = import.meta.env.BASE_URL;
export const API_URL = import.meta.env.DEV ? API_URL_LOCAL : API_URL_LIVE;
