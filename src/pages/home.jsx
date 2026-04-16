import { useState } from "react";
import { IMAGE_BASE_URL } from "../services/movieApi.js";
import { useHomeData } from "../hooks/useHomeData";
import Loading from "../components/Loading";
import GenreRow from "../components/genre-row";
import TrendingToday from "../components/trending-today";
import { MdPlayCircle, MdStar, MdWhatshot, MdCalendarMonth } from "react-icons/md";

const CATEGORY_TABS = [
    { name: "Now Playing", icon: <MdPlayCircle /> },
    { name: "Top Rated",   icon: <MdStar /> },
    { name: "Popular",     icon: <MdWhatshot /> },
    { name: "Upcoming",    icon: <MdCalendarMonth /> },
];

const GENRES = [
    { name: "Action",    id: 28 },
    { name: "Comedy",    id: 35 },
    { name: "Horror",    id: 27 },
    { name: "Romance",   id: 10749 },
    { name: "Sci-Fi",    id: 878 },
    { name: "Drama",     id: 18 },
    { name: "Animation", id: 16 },
];

export default function Home() {
    const { categorizedMovies, loading, error } = useHomeData();
    const [activeTab, setActiveTab] = useState("Now Playing");

    if (loading) return <Loading />;

    if (error) {
        return (
            <div style={{ padding: "20px", color: "red" }}>
                <p>Error: {error}</p>
            </div>
        );
    }

    const trendingMovies = categorizedMovies["Trending Today"] || [];
    const activeMovies = categorizedMovies[activeTab] || [];

    return (
        <div className="home-page">
            <div>
                {trendingMovies.length > 0 && (
                    <TrendingToday movies={trendingMovies} IMAGE_BASE_URL={IMAGE_BASE_URL} />
                )}
            </div>

            <div className="filter-nav-wrapper">
                <nav className="header-nav glass filter-nav">
                    {CATEGORY_TABS.map(function (tab) {
                        return (
                            <button
                                key={tab.name}
                                className={activeTab === tab.name ? "nav-btn active" : "nav-btn"}
                                onClick={function () { setActiveTab(tab.name); }}
                            >
                                {tab.icon}
                                <span className="nav-label-bottom">{tab.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="category-container category-container--no-top-padding">
                {GENRES.map(function (genre) {
                    const movies = activeMovies.filter(function (movie) {
                        return movie.genre_ids && movie.genre_ids.includes(genre.id);
                    });

                    if (movies.length === 0) return null;

                    return (
                        <GenreRow
                            key={genre.id}
                            genreName={genre.name}
                            movies={movies}
                            IMAGE_BASE_URL={IMAGE_BASE_URL}
                        />
                    );
                })}
            </div>
        </div>
    );
}
