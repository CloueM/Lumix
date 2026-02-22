import { useEffect, useState } from "react";
import { fetchGenres } from "../services/movieApi.js";

export function useMovieData(fetchMoviesFunction) {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!fetchMoviesFunction) return;

        async function loadData() {
            try {
                setLoading(true);

                const [moviesData, genresData] = await Promise.all([
                    fetchMoviesFunction(),
                    fetchGenres()
                ]);

                setMovies(moviesData.results);
                setGenres(genresData.genres);
            } catch (err) {
                setError(err.message);
                console.error("Failed to load data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [fetchMoviesFunction]);

    // Group movies by genre, only show genres with 10+ movies
    const moviesByGenre = {};
    genres.forEach(genre => {
        const moviesInGenre = movies.filter(movie => movie.genre_ids.includes(genre.id));
        if (moviesInGenre.length >= 10) {
            moviesByGenre[genre.name] = moviesInGenre;
        }
    });

    return { movies, genres, moviesByGenre, loading, error };
}
