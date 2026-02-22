import { FaStar, FaBookmark, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/movie-card.css";
import "../styles/buttons.css";

export default function MovieCard({ movie, IMAGE_BASE_URL }) {
    const navigate = useNavigate();

    function truncateTitle(text) {
        if (!text) return "Untitled";
        if (text.length > 30) return text.substring(0, 25) + "...";
        return text;
    }

    function truncateOverview(text) {
        if (!text) return "No overview available.";
        if (text.length > 100) return text.substring(0, 100) + "...";
        return text;
    }

    function formatDate(dateString) {
        if (!dateString) return "Release date unknown";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    // TODO: bookmark feature not built yet
    function handleBookmark(e) {
        e.stopPropagation();
        console.log("Bookmark clicked for:", movie.title);
    }

    // Go to the movie detail page
    function handleView(e) {
        e.stopPropagation();
        navigate(`/movie/${movie.id}`);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster-container">
                <img
                    className="movie-posters"
                    src={IMAGE_BASE_URL + movie.poster_path}
                    alt={movie.title}
                />
                <div className="movie-overlay">
                    <div className="overlay-content">
                        <div className="overlay-bottom-content">
                            <h3 className="overlay-title">{truncateTitle(movie.title)}</h3>
                            <div className="overlay-rating">
                                <FaStar className="star-icon" />
                                <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                            </div>
                            <p className="overlay-date">{formatDate(movie.release_date)}</p>
                            <p className="overlay-overview">{truncateOverview(movie.overview)}</p>
                        </div>
                        <div className="overlay-buttons">
                            <button
                                className="view-btn"
                                onClick={handleView}
                                aria-label="View movie details"
                            >
                                <FaPlay className="button-icon" />
                                View
                            </button>
                            <button
                                className="bookmark-btn glass"
                                onClick={handleBookmark}
                                aria-label="Bookmark movie"
                            >
                                <FaBookmark className="button-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
