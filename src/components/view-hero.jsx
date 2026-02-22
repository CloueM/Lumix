import { FaStar, FaBookmark } from "react-icons/fa";
import "../styles/view-hero.css";
import "../styles/buttons.css";

export default function ViewHero({ movie, trailerKey, IMAGE_BASE_URL }) {
    const backgroundImage = movie.backdrop_path
        ? IMAGE_BASE_URL + movie.backdrop_path
        : IMAGE_BASE_URL + movie.poster_path;

    const posterImage = movie.poster_path
        ? IMAGE_BASE_URL + movie.poster_path
        : "https://via.placeholder.com/300x450?text=No+Poster";

    const year = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : "N/A";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "N/A";

    // Convert minutes to "1h 45m" format
    function formatRuntime(minutes) {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    // Format date like "January 1, 2024"
    function formatDate(dateString) {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    return (
        <div className="view-hero">
            <div
                className="view-backdrop"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="view-gradient" />

            <div className="view-content">
                <div className="view-main-panel">
                    <div className="view-content-row">
                        <div className="view-media-col">
                            <h2 className="details-title">{movie.title || movie.name}</h2>

                            {trailerKey && (
                                <div className="view-trailer">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                                        title="Movie Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>

                        <div className="view-info-col">
                            <div className="details-poster-row">
                                <div className="details-poster">
                                    <img
                                        src={posterImage}
                                        alt={movie.title || "Movie Poster"}
                                        loading="lazy"
                                    />
                                </div>

                                <div className="details-meta-items">
                                    <div className="meta-grid">
                                        <div className="meta-item">
                                            <span className="meta-label">Status</span>
                                            <span className="meta-value">{movie.status || "N/A"}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Runtime</span>
                                            <span className="meta-value">{formatRuntime(movie.runtime)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Release Date</span>
                                            <span className="meta-value">{formatDate(movie.release_date)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Rating</span>
                                            <span className="meta-value">
                                                <FaStar className="meta-star" /> {rating}
                                            </span>
                                        </div>
                                        <div className="meta-item meta-genres-item">
                                            <span className="meta-label">Genres</span>
                                            <div className="meta-genres">
                                                <span className="meta-value">
                                                    {movie.genres && movie.genres.length > 0
                                                        ? movie.genres.map(g => g.name).join(", ")
                                                        : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="details-overview">
                                {movie.overview || "No description available."}
                            </p>

                            <button className="bookmark-btn">
                                <FaBookmark className="button-icon" />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
