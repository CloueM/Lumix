import { useEffect, useState } from "react";
import { fetchGenres } from "../services/movieApi.js";

// fetchMoviesFunctions can be any of the following:
// fetchNowPlayingMovies
// fetchTopRatedMovies
// fetchUpcomingMovies
// fetchPopularMovies
export function useMovieData(fetchMoviesFunction) {
    // State to store the data
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                // Fetch both movies and genres in parallel
                const [moviesData, genresData] = await Promise.all([
                    fetchMoviesFunction(), 
                    fetchGenres()           
                ]);

                // Save the data to state
                setMovies(moviesData.results);
                setGenres(genresData.genres);
            } catch (err) {
                setError(err.message);
                console.error("Failed to load data:", err);
            } finally {
                setLoading(false);
            }
        }

        // Only load data if have a fetch function
        if (fetchMoviesFunction) {
            loadData();
        }
    }, [fetchMoviesFunction]); // Re-run if the fetch function changes

    // Runs whenever movies or genres change
    const groupMoviesByGenre = () => {
        const grouped = {};
        const MIN_MOVIES_PER_GENRE = 10; // Only show genres with at least 10 movies

        genres.forEach(genre => {
            const moviesInGenre = movies.filter(
                movie => movie.genre_ids.includes(genre.id)
            );
            // Only include genres that have at least MIN_MOVIES_PER_GENRE movies
            if (moviesInGenre.length >= MIN_MOVIES_PER_GENRE) {
                grouped[genre.name] = moviesInGenre;
            }
        });
        return grouped;
    };

    const moviesByGenre = groupMoviesByGenre();

    return {
        movies,
        genres,
        moviesByGenre,
        loading,
        error
    };
}
