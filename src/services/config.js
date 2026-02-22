// API keys and base URLs come from the .env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const LANGUAGE = "en_US";
export const PAGES_TO_FETCH = 5;

export const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`;

export { API_KEY };
