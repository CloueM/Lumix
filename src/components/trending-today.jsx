import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaPlay, FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useFavorites } from "../hooks/useFavorites";
import "../styles/trending-today.css";
import "../styles/buttons.css";

// banner for trending movies
export default function TrendingToday({ movies, IMAGE_BASE_URL }) {
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    // track which movie in list is showing
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentMovie = movies[currentIndex];
    
    // check if movie is in favorite
    let favorited = false;
    if (currentMovie) {
        favorited = isFavorite(currentMovie.id);
    }

    // change movie thats showing every 20 seconds
    useEffect(() => {
        const interval = setInterval(function() {
            // go back to start if array end
            setCurrentIndex(function(prev) {
                if (prev + 1 >= movies.length) {
                    return 0;
                } else {
                    return prev + 1;
                }
            });
        }, 20000);
        
        // clean up timer
        return function() {
            clearInterval(interval);
        };
    }, [movies.length]);

    // dont show anything if there are no movies
    if (!currentMovie) {
        return null;
    }

    // use backdrop or poster image for fallback
    let backgroundImage = "";
    if (currentMovie.backdrop_path) {
        backgroundImage = IMAGE_BASE_URL + currentMovie.backdrop_path;
    } else {
        backgroundImage = IMAGE_BASE_URL + currentMovie.poster_path;
    }

    // get release year for movie or tv
    let year = "N/A";
    if (currentMovie.release_date) {
        const date = new Date(currentMovie.release_date);
        year = date.getFullYear();
    } else if (currentMovie.first_air_date) {
        const date = new Date(currentMovie.first_air_date);
        year = date.getFullYear();
    }

    // get info for display
    let title = "";
    if (currentMovie.title) {
        title = currentMovie.title;
    } else if (currentMovie.name) {
        title = currentMovie.name;
    }

    let rating = "N/A";
    if (currentMovie.vote_average) {
        rating = currentMovie.vote_average.toFixed(1);
    }
    
    let mediaType = "Movie";
    if (currentMovie.media_type === "tv") {
        mediaType = "TV Series";
    }

    // makes the overview shorter
    let overview = "";
    if (currentMovie.overview) {
        if (currentMovie.overview.length > 300) {
            overview = currentMovie.overview.substring(0, 300).trim() + "...";
        } else {
            overview = currentMovie.overview;
        }
    }

    // click buttons
    function handleViewClick() {
        navigate("/movie/" + currentMovie.id);
    }

    function handleBookmarkClick() {
        toggleFavorite(currentMovie);
    }

    let bookmarkIcon;
    if (favorited) {
        bookmarkIcon = <FaBookmark className="button-icon" />;
    } else {
        bookmarkIcon = <FaRegBookmark className="button-icon" />;
    }

    let bookmarkClass = "bookmark-btn glass";
    if (favorited) {
        bookmarkClass = "bookmark-btn glass active";
    }

    return (
        <div className="trending-hero">
            <div
                className="hero-backdrop"
                style={{ backgroundImage: "url(" + backgroundImage + ")" }}
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

                {/* Action buttons (View Details and Bookmark) */}
                <div className="hero-buttons">
                    <button
                        className="view-btn"
                        onClick={handleViewClick}
                        aria-label="View movie details"
                    >
                        <FaPlay className="button-icon" />
                        View
                    </button>
                    <button
                        className={bookmarkClass}
                        onClick={handleBookmarkClick}
                        aria-label="Bookmark"
                    >
                        {bookmarkIcon}
                    </button>
                </div>

                {/* Navigation dots to manually skip between trending items */}
                <div className="hero-indicators">
                    {movies.map(function(movie, index) {
                        let indicatorClass = "indicator";
                        if (index === currentIndex) {
                            indicatorClass = "indicator active";
                        }
                        
                        return (
                            <button
                                key={index}
                                className={indicatorClass}
                                onClick={function() { setCurrentIndex(index); }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

