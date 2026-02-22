import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaBookmark } from "react-icons/fa";
import "../styles/trending-today.css";
import "../styles/buttons.css";

export default function TrendingToday({ movies, IMAGE_BASE_URL }) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentMovie = movies[currentIndex];

    // Auto-rotate every 20 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1 >= movies.length ? 0 : prev + 1));
        }, 20000);
        return () => clearInterval(interval);
    }, [movies.length]);

    if (!currentMovie) return null;

    const backgroundImage = currentMovie.backdrop_path
        ? IMAGE_BASE_URL + currentMovie.backdrop_path
        : IMAGE_BASE_URL + currentMovie.poster_path;

    // Movies use release_date, TV shows use first_air_date
    let year = "N/A";
    if (currentMovie.release_date) {
        year = new Date(currentMovie.release_date).getFullYear();
    } else if (currentMovie.first_air_date) {
        year = new Date(currentMovie.first_air_date).getFullYear();
    }

    const title = currentMovie.title || currentMovie.name || "";
    const rating = currentMovie.vote_average ? currentMovie.vote_average.toFixed(1) : "N/A";
    const mediaType = currentMovie.media_type === "tv" ? "TV Series" : "Movie";

    let overview = "";
    if (currentMovie.overview) {
        overview = currentMovie.overview.length > 300
            ? currentMovie.overview.substring(0, 300).trim() + "..."
            : currentMovie.overview;
    }

    return (
        <div className="trending-hero">
            <div
                className="hero-backdrop"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="hero-gradient"></div>
            </div>

            <div className="hero-content">
                <div className="hero-badge glass">Trending Today</div>
                <h1 className="hero-title">{title}</h1>

                <div className="hero-meta">
                    <span className="hero-rating">⭐ {rating}</span>
                    <span className="hero-separator">•</span>
                    <span className="hero-year">{year}</span>
                    <span className="hero-separator">•</span>
                    <span className="hero-type">{mediaType}</span>
                </div>

                <p className="hero-overview">{overview}</p>

                <div className="hero-buttons">
                    <button
                        className="view-btn"
                        onClick={() => navigate(`/movie/${currentMovie.id}`)}
                        aria-label="View movie details"
                    >
                        <FaPlay className="button-icon" />
                        View
                    </button>
                    <button
                        className="bookmark-btn glass"
                        onClick={() => console.log("Bookmark clicked for:", title)}
                        aria-label="Bookmark movie"
                    >
                        <FaBookmark className="button-icon" />
                    </button>
                </div>

                <div className="hero-indicators">
                    {movies.map((movie, index) => (
                        <button
                            key={index}
                            className={index === currentIndex ? "indicator active" : "indicator"}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
