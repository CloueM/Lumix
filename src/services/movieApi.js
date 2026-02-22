import { BASE_URL, API_KEY, LANGUAGE, GENRE_URL, IMAGE_BASE_URL } from './config.js';
import { fetchMultiplePages } from './helpers.js';

export { IMAGE_BASE_URL };

// Get the list of all movie genres
export async function fetchGenres() {
    const res = await fetch(GENRE_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
}

// These functions fetch movies from different TMDb endpoints
export async function fetchNowPlayingMovies() {
    const baseUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    return await fetchMultiplePages(baseUrl);
}

export async function fetchPopularMovies() {
    const baseUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    return await fetchMultiplePages(baseUrl);
}

export async function fetchTopRatedMovies() {
    const baseUrl = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    return await fetchMultiplePages(baseUrl);
}

export async function fetchUpcomingMovies() {
    const baseUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&region`;
    return await fetchMultiplePages(baseUrl);
}

export async function fetchTrendingToday() {
    const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
}

// These functions are for the single movie detail/view page
export async function fetchMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
}

export async function fetchMovieVideos(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
}

export async function fetchMovieCast(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
}

// Search for movies by title - returns one page of results
export async function searchMovies(query, page = 1) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data; // { results, page, total_pages, total_results }
}

