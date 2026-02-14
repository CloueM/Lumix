import { BASE_URL, API_KEY, LANGUAGE, GENRE_URL, IMAGE_BASE_URL } from './config.js';
import { fetchMultiplePages } from './helpers.js';

export { IMAGE_BASE_URL };

// Get all movie genres from TMDb
export async function fetchGenres() {
    try {
        const res = await fetch(GENRE_URL);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
}

// Get movies currently in theaters
export async function fetchNowPlayingMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching now playing movies:", error);
        throw error;
    }
}

// Get popular movies
export async function fetchPopularMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
}

// Get highest rated movies
export async function fetchTopRatedMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching top rated movies:", error);
        throw error;
    }
}

// Get movies coming soon
export async function fetchUpcomingMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        throw error;
    }
}

// Get what's trending today
export async function fetchTrendingToday() {
    try {
        const url = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=${LANGUAGE}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching trending today:", error);
        throw error;
    }
}

// Get detailed info about a specific movie
export async function fetchMovieDetails(movieId) {
    try {
        const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}

// Get trailers and videos for a movie
export async function fetchMovieVideos(movieId) {
    try {
        const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANGUAGE}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie videos:", error);
        throw error;
    }
}

// Get actors and cast for a movie
export async function fetchMovieCast(movieId) {
    try {
        const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie cast:", error);
        throw error;
    }
}
