import { FaStar } from "react-icons/fa";
import "../styles/movie-card.css";

export default function MovieCard({ movie, IMAGE_BASE_URL }) {
    const truncateOverview = (text, maxLength = 200) => {
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
                    </div>
                </div>
            </div>
        </div>
    );
}
