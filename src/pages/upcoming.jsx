import { fetchUpcomingMovies, IMAGE_BASE_URL } from "../../service/services"
import { useMovieData } from "../hooks/useMovieData"
import Loading from "../components/Loading"
import GenreRow from "../components/genre-row"

export default function Upcoming() {
    const { moviesByGenre, loading, error } = useMovieData(fetchUpcomingMovies);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}><h1>Upcoming</h1><p>Error: {error}</p></div>;
    }

    return (
        <div className="category-container">
            {Object.entries(moviesByGenre).map(([genreName, movies]) => (
                <GenreRow
                    key={genreName}
                    genreName={genreName}
                    movies={movies}
                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                />
            ))}
        </div>
    );
};