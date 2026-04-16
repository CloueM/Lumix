import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { useFavorites } from "../hooks/useFavorites";
import { useMovieLogos } from "../hooks/useMovieLogos";
import BookmarkMenu from "./bookmark-menu";
import "../styles/trending-today.css";
import "../styles/buttons.css";

export default function TrendingToday({ movies, IMAGE_BASE_URL }) {
    const navigate = useNavigate();
    const { isFavorite, getFavoriteStatus, updateFavoriteStatus, removeFavorite } = useFavorites();
    const logos = useMovieLogos(movies);
    const [menuPosition, setMenuPosition] = useState(null);
    const [activeMovie, setActiveMovie] = useState(null);

    // don't show anything if there are no movies
    if (movies.length === 0) {
        return null;
    }

    function handleViewClick(e, movie) {
        e.stopPropagation();
        navigate("/movie/" + movie.id);
    }

    function handleBookmarkClick(e, movie) {
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('lumix-close-menus', { detail: { movieId: movie.id } }));
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setActiveMovie(movie);
    }

    return (
        <div className="trending-hero">
            <div className="hero-track">
                {movies.map(function(movie, index) {
                    // get the background image for this movie
                    let backgroundImage = "";
                    if (movie.backdrop_path) {
                        backgroundImage = IMAGE_BASE_URL + movie.backdrop_path;
                    } else if (movie.poster_path) {
                        backgroundImage = IMAGE_BASE_URL + movie.poster_path;
                    }

                    // get the release year
                    let year = "N/A";
                    if (movie.release_date) {
                        year = new Date(movie.release_date).getFullYear();
                    } else if (movie.first_air_date) {
                        year = new Date(movie.first_air_date).getFullYear();
                    }

                    // get the title
                    let title = "";
                    if (movie.title) {
                        title = movie.title;
                    } else if (movie.name) {
                        title = movie.name;
                    }

                    // get the rating
                    let rating = "N/A";
                    if (movie.vote_average) {
                        rating = movie.vote_average.toFixed(1);
                    }

                    // check if it's a movie or tv show
                    let mediaType = "Movie";
                    if (movie.media_type === "tv") {
                        mediaType = "TV Series";
                    }

                    // shorten the overview so it doesn't take up too much space
                    let overview = "";
                    if (movie.overview) {
                        if (movie.overview.length > 300) {
                            overview = movie.overview.substring(0, 300).trim() + "...";
                        } else {
                            overview = movie.overview;
                        }
                    }

                    // check if this movie is bookmarked
                    let favorited = isFavorite(movie.id);

                    let bookmarkClass = "bookmark-btn glass";
                    if (favorited) {
                        bookmarkClass = "bookmark-btn glass active";
                    }

                    let bookmarkIcon;
                    if (favorited) {
                        bookmarkIcon = <FaBookmark className="button-icon" />;
                    } else {
                        bookmarkIcon = <FaRegBookmark className="button-icon" />;
                    }

                    return (
                        <div className="hero-slide" key={movie.id || index}>
                            <div
                                className="hero-backdrop"
                                style={{ backgroundImage: "url(" + backgroundImage + ")" }}
                            >
                                <div className="hero-gradient"></div>
                            </div>

                            <div className="hero-content">
                                {logos[movie.id] ? (
                                    <img 
                                        src={IMAGE_BASE_URL + logos[movie.id]} 
                                        alt={`${title} logo`} 
                                        className="hero-logo" 
                                        draggable="false"
                                    />
                                ) : (
                                    <h1 className="hero-title">{title}</h1>
                                )}

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
                                        onClick={(e) => handleViewClick(e, movie)}
                                        aria-label="View movie details"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <FaPlay className="button-icon" />
                                        View
                                    </button>
                                    <button
                                        className={bookmarkClass}
                                        onClick={(e) => handleBookmarkClick(e, movie)}
                                        aria-label="Bookmark"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {bookmarkIcon}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {menuPosition && activeMovie && (
                <BookmarkMenu 
                    movie={activeMovie}
                    position={menuPosition}
                    onClose={() => {
                        setMenuPosition(null);
                        setActiveMovie(null);
                    }}
                    getFavoriteStatus={getFavoriteStatus}
                    updateFavoriteStatus={updateFavoriteStatus}
                    removeFavorite={removeFavorite}
                />
            )}
        </div>
    );
}
