// ============================================================================
// TMDb API Service
// ============================================================================
// This file contains all API-related configuration and functions for fetching
// movie data from The Movie Database (TMDb).

// ----------------------------------------------------------------------------
// Environment Configuration
// ----------------------------------------------------------------------------
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// API Constants
// ----------------------------------------------------------------------------
const LANGUAGE = "en_US";
const PAGES_TO_FETCH = 5; // Number of pages to fetch for more movies per genre

// ----------------------------------------------------------------------------
// API Endpoints
// ----------------------------------------------------------------------------

// Genre Endpoint
export const GENRE = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`;

// Helper function to fetch multiple pages
async function fetchMultiplePages(baseUrl) {
    try {
        const pagePromises = [];
        for (let page = 1; page <= PAGES_TO_FETCH; page++) {
            const url = `${baseUrl}&page=${page}`;
            pagePromises.push(fetch(url));
        }

        const responses = await Promise.all(pagePromises);

        // Check if all responses are ok
        for (const res of responses) {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }

        // Parse all JSON responses
        const dataArray = await Promise.all(responses.map(res => res.json()));

        // Combine all results
        const combinedResults = dataArray.reduce((acc, data) => {
            return acc.concat(data.results);
        }, []);

        // Return the first data object but with combined results
        return {
            ...dataArray[0],
            results: combinedResults,
            total_results: combinedResults.length
        };
    } catch (error) {
        console.error("Error fetching multiple pages:", error);
        throw error;
    }
}

// ============================================================================
// API Service Functions
// ============================================================================

export async function fetchGenres() {
    try {
        const res = await fetch(GENRE);
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

export async function fetchNowPlayingMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching now playing movies:", error);
        throw error;
    }
}

export async function fetchPopularMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
}

export async function fetchTopRatedMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching top rated movies:", error);
        throw error;
    }
}

export async function fetchUpcomingMovies() {
    try {
        const baseUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}&region`;
        return await fetchMultiplePages(baseUrl);
    } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        throw error;
    }
}
