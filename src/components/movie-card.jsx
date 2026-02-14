import { FaStar, FaBookmark, FaPlay } from "react-icons/fa";
import "../styles/movie-card.css";
import "../styles/buttons.css";

export default function MovieCard({ movie, IMAGE_BASE_URL }) {
    const truncateOverview = (text, maxLength = 100) => {
        if (!text) return 'No overview available.';
        return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Release date unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleBookmark = (e) => {
        e.stopPropagation();
        // TODO: Add bookmark functionality
        console.log('Bookmark clicked for:', movie.title);
    };

    const handleView = (e) => {
        e.stopPropagation();
        // TODO: Add view details functionality
        console.log('View clicked for:', movie.title);
    };

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
                            <h3 className="overlay-title">{movie.title}</h3>
                            <div className="overlay-rating">
                                <FaStar className="star-icon" />
                                <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                            </div>
                            <p className="overlay-date">
                                {formatDate(movie.release_date)}
                            </p>
                            <p className="overlay-overview">
                                {truncateOverview(movie.overview)}
                            </p>
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
