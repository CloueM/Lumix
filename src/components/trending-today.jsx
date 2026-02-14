import { useEffect, useState } from "react";
import { FaStar, FaPlay, FaBookmark } from "react-icons/fa";
import "../styles/trending-today.css";
import "../styles/buttons.css";

export default function TrendingToday({ movies, IMAGE_BASE_URL }) {
    // Keep track of which movie we're showing
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Get the current movie from the array
    const currentMovie = movies[currentIndex];

    // This makes the carousel automatically change every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // Go to next movie, or back to first if we're at the end
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex >= movies.length) {
                    return 0; // Go back to first movie
                }
                return nextIndex;
            });
        }, 20000); // Change every 20 seconds

        // Clean up when component is removed
        return () => clearInterval(interval);
    }, [movies.length]);

    // If there's no movie, don't show anything
    if (!currentMovie) {
        return null;
    }

    // Get the background image
    let backgroundImage = "";
    if (currentMovie.backdrop_path) {
        backgroundImage = IMAGE_BASE_URL + currentMovie.backdrop_path;
    } else {
        backgroundImage = IMAGE_BASE_URL + currentMovie.poster_path;
    }

    // Get the release year
    let year = "N/A";
    if (currentMovie.release_date) {
        const date = new Date(currentMovie.release_date);
        year = date.getFullYear();
    } else if (currentMovie.first_air_date) {
        const date = new Date(currentMovie.first_air_date);
        year = date.getFullYear();
    }

    // Get the title (movies have "title", TV shows have "name")
    let title = "";
    if (currentMovie.title) {
        title = currentMovie.title;
    } else if (currentMovie.name) {
        title = currentMovie.name;
    }

    // Get the rating
    let rating = "N/A";
    if (currentMovie.vote_average) {
        rating = currentMovie.vote_average.toFixed(1);
    }

    // Shorten the overview if it's too long
    let overview = "";
    if (currentMovie.overview) {
        if (currentMovie.overview.length > 300) {
            overview = currentMovie.overview.substring(0, 300).trim() + "...";
        } else {
            overview = currentMovie.overview;
        }
    }

    // Figure out if it's a movie or TV show
    let mediaType = "Movie";
    if (currentMovie.media_type === "tv") {
        mediaType = "TV Series";
    }

    // Function to change to a specific movie when clicking indicator
    function goToMovie(index) {
        setCurrentIndex(index);
    }

    // Handle view button click
    const handleView = () => {
        // TODO: Add view details functionality
        console.log('View clicked for:', title);
    };

    // Handle bookmark button click
    const handleBookmark = () => {
        // TODO: Add bookmark functionality
        console.log('Bookmark clicked for:', title);
    };

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

                <div className="hero-indicators">
                    {movies.map((movie, index) => {
                        let buttonClass = "indicator";
                        if (index === currentIndex) {
                            buttonClass = "indicator active";
                        }
                        
                        return (
                            <button
                                key={index}
                                className={buttonClass}
                                onClick={() => goToMovie(index)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
