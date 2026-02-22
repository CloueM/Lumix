import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ActorCard from "./actor-card";
import "../styles/movie-cast.css";

export default function ActorsRow({ actors, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);

    // Scroll the cast row left or right when arrow buttons are clicked
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
        <div className="movie-cast">
            <h2 className="section-title cast-title">Cast</h2>
            <div className="cast-row-container">
                <button
                    className="scroll-arrow scroll-arrow-left"
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>
                <div className="cast-row-scroll" ref={scrollRef}>
                    {actors.map(actor => (
                        <ActorCard
                            key={actor.id}
                            actor={actor}
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
