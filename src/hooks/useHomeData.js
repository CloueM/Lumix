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

                // Fetch all movie categories in parallel
                const [trendingData, nowPlayingData, popularData, topRatedData, upcomingData] = await Promise.all([
                    fetchTrendingToday(),
                    fetchNowPlayingMovies(),
                    fetchPopularMovies(),
                    fetchTopRatedMovies(),
                    fetchUpcomingMovies()
                ]);

                // Take only the first 10 movies from each category
                const categorized = {
                    "Trending Today": trendingData.results.slice(0, 10),
                    "Now Playing": nowPlayingData.results.slice(0, 10),
                    "Popular": popularData.results.slice(0, 10),
                    "Top Rated": topRatedData.results.slice(0, 10),
                    "Upcoming": upcomingData.results.slice(0, 10)
                };

                setCategorizedMovies(categorized);
            } catch (err) {
                setError(err.message);
                console.error("Failed to load home data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []); // Run once on mount

    return {
        categorizedMovies,
        loading,
        error
    };
}
