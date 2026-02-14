import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ActorCard from "./actor-card";
import "../styles/components/movie-cast.css";

export default function ActorsRow({ actors, IMAGE_BASE_URL }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="movie-cast">
            <h2 className="cast-title">Cast</h2>
            <div className="cast-row-container">
                <button
                    className="scroll-arrow scroll-arrow-left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <FaChevronLeft />
                </button>
                <div
                    className="cast-row-scroll"
                    ref={scrollRef}
                >
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
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}
