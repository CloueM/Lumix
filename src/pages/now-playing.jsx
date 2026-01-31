import { fetchNowPlayingMovies, IMAGE_BASE_URL } from "../../service/services"
import { useMovieData } from "../hooks/useMovieData"
import { useRef } from "react"
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa"
import Loading from "../components/Loading"
import "../styles/now-playing.css"

export default function NowPlaying() {
    const { moviesByGenre, loading, error } = useMovieData(fetchNowPlayingMovies);
    const scrollRefs = useRef({});

    const scroll = (genreName, direction) => {
        const container = scrollRefs.current[genreName];
        if (container) {
            const scrollAmount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}><h1>Now Playing</h1><p>Error: {error}</p></div>;
    }

    return (
        <div className="now-playing-page">
            {Object.entries(moviesByGenre).map(([genreName, movies]) => (
                <div key={genreName} className="genre-row">
                    <h2 className="genre-title">{genreName}</h2>
                    <div className="movie-row-container">
                        <button
                            className="scroll-arrow scroll-arrow-left"
                            onClick={() => scroll(genreName, 'left')}
                            aria-label="Scroll left"
                        >
                            <FaChevronLeft />
                        </button>
                        <div
                            className="movie-row-scroll"
                            ref={(el) => scrollRefs.current[genreName] = el}
                        >
                            {movies.map(movie => (
                                <div key={movie.id} className="movie-card">
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
                                                        {console.log(movie)}
                                                        {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Release date unknown'}
                                                    </p>
                                                    <p className="overlay-overview">
                                                        {movie.overview
                                                            ? (movie.overview.length > 200
                                                                ? movie.overview.substring(0, 200) + '...'
                                                                : movie.overview)
                                                            : 'No overview available.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="scroll-arrow scroll-arrow-right"
                            onClick={() => scroll(genreName, 'right')}
                            aria-label="Scroll right"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};