import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./movie-card";
import "../styles/genre-row.css";

export default function GenreRow({ genreName, movies, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);

    // Scroll the movie row left or right when arrow buttons are clicked
    function scroll(direction) {
        const container = scrollRef.current;
        if (container) {
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: direction === "left" ? -amount : amount,
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
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>
                <div className="movie-row-scroll" ref={scrollRef}>
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            IMAGE_BASE_URL={IMAGE_BASE_URL}
                        />
                    ))}
                </div>
                <button
                    className="scroll-arrow scroll-arrow-right"
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
