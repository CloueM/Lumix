import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DraggableCore } from "react-draggable";
import MovieCard from "./movie-card";
import "../styles/genre-row.css";

export default function GenreRow({ genreName, movies, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const hasDragged = useRef(false);
    const [isGrabbing, setIsGrabbing] = useState(false);

    // scroll left when the arrow is clicked
    function scrollLeft() {
        const container = scrollRef.current;
        if (container !== null) {
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: -amount,
                behavior: "smooth"
            });
        }
    }

    // scroll right when the arrow is clicked
    function scrollRight() {
        const container = scrollRef.current;
        if (container !== null) {
            const amount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: amount,
                behavior: "smooth"
            });
        }
    }

    function handleDragStart() {
        isDragging.current = true;
        hasDragged.current = false;
        setIsGrabbing(true);
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = "auto";
        }
    }

    function handleDrag(e, data) {
        if (Math.abs(data.deltaX) > 2) {
            hasDragged.current = true;
        }
        // move the scroll the opposite way of the drag
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= data.deltaX;
        }
    }

    function handleDragStop() {
        isDragging.current = false;
        setIsGrabbing(false);
        if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = "smooth";
        }
        setTimeout(function() {
            hasDragged.current = false;
        }, 0);
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

                <DraggableCore
                    onStart={handleDragStart}
                    onDrag={handleDrag}
                    onStop={handleDragStop}
                    nodeRef={scrollRef}
                >
                    <div
                        className="movie-row-scroll"
                        ref={scrollRef}
                        style={{ cursor: isGrabbing ? "grabbing" : "grab", userSelect: "none" }}
                    >
                        {/* loop through each movie and make a card for it */}
                        {movies.map(function(movie) {
                            return (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                                    hasDragged={hasDragged}
                                />
                            );
                        })}
                    </div>
                </DraggableCore>

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
