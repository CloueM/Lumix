import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./movie-card";
import "../styles/genre-row.css";

// scroll list of movie for genre horizontally
export default function GenreRow({ genreName, movies, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);

    // scroll left
    function scrollLeft() {
        const container = scrollRef.current;
        if (container !== null) {
            // Calculate scroll distance: 80% of the visible container width
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: -amount,
                behavior: "smooth"
            });
        }
    }

    // scroll right
    function scrollRight() {
        const container = scrollRef.current;
        if (container !== null) {
            // Calculate scroll distance: 80% of the visible container width
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: amount,
                behavior: "smooth"
            });
        }
    }

    return (
        <div className="genre-row">
            <h2 className="section-title genre-title">{genreName}</h2>
            <div className="movie-row-container">
                <button
                    className="scroll-arrow scroll-arrow-left"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>
                <div className="movie-row-scroll" ref={scrollRef}>
                    {/* Loop through each movie and render a MovieCard for it */}
                    {movies.map(function(movie) {
                        return (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                IMAGE_BASE_URL={IMAGE_BASE_URL}
                            />
                        );
                    })}
                </div>
                <button
                    className="scroll-arrow scroll-arrow-right"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}

