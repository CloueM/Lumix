import { useEffect, useState } from "react";
import {
    fetchNowPlayingMovies,
    fetchPopularMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
    fetchTrendingToday
} from "../services/movieApi.js";

export function useHomeData() {
    const [categorizedMovies, setCategorizedMovies] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);

                // Fetch all categories at the same time instead of one by one
                const [trendingData, nowPlayingData, popularData, topRatedData, upcomingData] = await Promise.all([
                    fetchTrendingToday(),
                    fetchNowPlayingMovies(),
                    fetchPopularMovies(),
                    fetchTopRatedMovies(),
                    fetchUpcomingMovies()
                ]);

                // Only keep 10 movies per category for the home page
                setCategorizedMovies({
                    "Trending Today": trendingData.results.slice(0, 10),
                    "Now Playing": nowPlayingData.results.slice(0, 10),
                    "Popular": popularData.results.slice(0, 10),
                    "Top Rated": topRatedData.results.slice(0, 10),
                    "Upcoming": upcomingData.results.slice(0, 10)
                });
            } catch (err) {
                setError(err.message);
                console.error("Failed to load home data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { categorizedMovies, loading, error };
}
