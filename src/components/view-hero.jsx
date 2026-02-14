import { FaStar } from "react-icons/fa";
import "../styles/components/view-hero.css";

export default function ViewHero({ movie, trailerKey, IMAGE_BASE_URL }) {
    
    // Use backdrop or fallback to poster
    const backgroundImage = movie.backdrop_path 
        ? IMAGE_BASE_URL + movie.backdrop_path
        : IMAGE_BASE_URL + movie.poster_path;

    // Get release year
    const year = movie.release_date 
        ? new Date(movie.release_date).getFullYear()
        : "N/A";

    // Format rating (out of 10)
    const rating = movie.vote_average 
        ? movie.vote_average.toFixed(1)
        : "N/A";

    return (
        <div className="view-hero">
            {/* Backdrop image */}
            <div 
                className="view-backdrop"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            
            {/* Dark gradient overlay */}
            <div className="view-gradient" />

            <div className="view-content">
                {/* Movie info */}
                <div className="view-info">
                    <h1 className="view-title">{movie.title || movie.name}</h1>
                    <div className="view-meta">
                        <span className="view-rating">
                            <FaStar /> {rating}
                        </span>
                        <span className="view-separator">•</span>
                        <span className="view-year">{year}</span>
                    </div>
                </div>

                {/* YouTube trailer */}
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
        </div>
    );
}
