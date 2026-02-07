import { IMAGE_BASE_URL } from "../../service/services";
import { useHomeData } from "../hooks/useHomeData";
import Loading from "../components/Loading";
import GenreRow from "../components/genre-row";
import TrendingToday from "../components/trending-today";
import "../styles/category-page.css";

export default function Home() {
    const { categorizedMovies, loading, error } = useHomeData();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h1>Home</h1>
                <p>Error: {error}</p>
            </div>
        );
    }

    // Separate trending from other categories
    const trendingMovies = categorizedMovies["Trending Today"] || [];
    const otherCategories = Object.entries(categorizedMovies).filter(
        ([categoryName]) => categoryName !== "Trending Today"
    );

    return (
        <div className="home-page">
            <div>
                {trendingMovies.length > 0 && (
                    <TrendingToday 
                        movies={trendingMovies}
                        IMAGE_BASE_URL={IMAGE_BASE_URL}
                    />
                )}
            </div>
            <div className="category-container">
            {otherCategories.map(([categoryName, movies]) => (
                <GenreRow
                    key={categoryName}
                    genreName={categoryName}
                    movies={movies}
                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                />
            ))}     
            </div>  
        </div>
    );
}
