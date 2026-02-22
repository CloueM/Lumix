import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCast, IMAGE_BASE_URL } from "../services/movieApi.js";
import ViewHero from "../components/view-hero";
import ActorsRow from "../components/actors-row";
import Loading from "../components/Loading";

export default function View() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load the movie details, trailer, and cast when the page opens
    useEffect(() => {
        if (!id) return;

        async function loadMovieData() {
            try {
                setLoading(true);

                const [movieData, videosData, castData] = await Promise.all([
                    fetchMovieDetails(id),
                    fetchMovieVideos(id),
                    fetchMovieCast(id)
                ]);

                setMovie(movieData);

                // Find the YouTube trailer
                const trailer = videosData.results.find(
                    video => video.type === "Trailer" && video.site === "YouTube"
                );
                if (trailer) setTrailerKey(trailer.key);

                // Only show first 15 cast members
                setActors(castData.cast.slice(0, 15));

            } catch (err) {
                setError(err.message);
                console.error("Failed to load movie data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadMovieData();
    }, [id]);

    if (loading) return <Loading />;

    if (error) {
        return (
            <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
                <h1>Error loading movie</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!movie) {
        return <div style={{ padding: "20px", textAlign: "center" }}>Movie not found</div>;
    }

    return (
        <div>
            <ViewHero
                movie={movie}
                trailerKey={trailerKey}
                IMAGE_BASE_URL={IMAGE_BASE_URL}
            />
            {actors.length > 0 && (
                <div className="category-container category-container--no-top-padding">
                    <ActorsRow
                        actors={actors}
                        IMAGE_BASE_URL={IMAGE_BASE_URL}
                    />
                </div>
            )}
        </div>
    );
}
