import { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaTimes, FaFilm } from 'react-icons/fa';
import { searchMovies, IMAGE_BASE_URL } from '../services/movieApi';
import MovieCard from '../components/movie-card';
import '../styles/search.css';

export default function Search() {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);

    const sentinelRef = useRef(null);
    const activeQueryRef = useRef('');

    // Trigger search
    function handleSearch() {
        const q = query.trim();
        if (q === submittedQuery) return; // no re-fetch if same
        setSubmittedQuery(q);
    }

    // Also search on Enter key
    function handleKeyDown(e) {
        if (e.key === 'Enter') handleSearch();
    }

    // Clear both input and results
    function handleClear() {
        setQuery('');
        setSubmittedQuery('');
        setMovies([]);
        setTotalPages(0);
        setTotalResults(0);
        setCurrentPage(1);
    }

    // Fetch first page whenever submittedQuery changes
    const fetchInitial = useCallback(async (q) => {
        if (!q) {
            setMovies([]);
            setTotalPages(0);
            setTotalResults(0);
            setCurrentPage(1);
            return;
        }
        setLoading(true);
        setError(null);
        activeQueryRef.current = q;
        try {
            const data = await searchMovies(q, 1);
            if (activeQueryRef.current !== q) return;
            setMovies(data.results.filter(m => m.poster_path));
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
            setCurrentPage(1);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitial(submittedQuery);
    }, [submittedQuery, fetchInitial]);

    // Load next page (infinite scroll)
    const fetchMore = useCallback(async () => {
        const nextPage = currentPage + 1;
        if (nextPage > totalPages || loadingMore || loading) return;
        setLoadingMore(true);
        try {
            const data = await searchMovies(submittedQuery, nextPage);
            setMovies(prev => [
                ...prev,
                ...data.results.filter(m => m.poster_path)
            ]);
            setCurrentPage(nextPage);
        } catch (err) {
            // silently fail on load-more
        } finally {
            setLoadingMore(false);
        }
    }, [currentPage, totalPages, loadingMore, loading, submittedQuery]);

    // Intersection observer on sentinel div for infinite scroll
    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) fetchMore();
            },
            { rootMargin: '200px' }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [fetchMore]);

    const hasMore = currentPage < totalPages;
    const showGrid = !loading && movies.length > 0;
    const showEmpty = !loading && submittedQuery && movies.length === 0 && !error;
    const showPlaceholder = !loading && !submittedQuery;

    return (
        <div className={`search-page${showGrid || loading ? ' search-page--has-results' : ''}`}>
            {/* Hero: header + search bar — centered when empty */}
            <div className="search-hero">
                {/* Header title */}
                <div className="search-header">
                    <FaSearch className="search-header-icon" />
                    <h1 className="search-header-title">Search</h1>
                </div>

                {/* Search bar */}
                <div className="search-bar-row">
                    <div className="search-bar-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            id="search-input"
                            className="search-input"
                            type="text"
                            placeholder="Search for a movie..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            aria-label="Search movies"
                        />
                        {query && (
                            <button
                                className="search-clear-btn"
                                onClick={handleClear}
                                aria-label="Clear search"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                    <button
                        className="search-submit-btn"
                        onClick={handleSearch}
                        aria-label="Search"
                    >
                        Search
                    </button>
                </div>
            </div>


            {/* Loading skeleton on first fetch */}
            {loading && (
                <div className="search-grid">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="movie-card">
                            <div className="movie-poster-container">
                                <div
                                    className="movie-posters"
                                    style={{
                                        background: 'var(--surface-color)',
                                        animation: 'pulse 1.5s ease-in-out infinite'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Results grid */}
            {showGrid && (
                <div className="search-grid">
                    <div className="search-results-header">
                        <h2 className="search-results-title">Search Results For &ldquo;{submittedQuery}&rdquo;</h2>
                        <p className="search-results-count">{totalResults.toLocaleString()} Results Found</p>
                    </div>
                    
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            IMAGE_BASE_URL={IMAGE_BASE_URL}
                        />
                    ))}

                    {/* Infinite scroll sentinel */}
                    {hasMore && (
                        <div className="search-sentinel" ref={sentinelRef}>
                            {loadingMore && <div className="loader">
                                <div className="box-load1" />
                                <div className="box-load2" />
                                <div className="box-load3" />
                            </div>}
                        </div>
                    )}
                </div>
            )}

            {/* Empty/error state */}
            {(showEmpty || error) && (
                <div className="search-page-center">
                    {showEmpty && (
                        <div className="search-empty">
                            <FaFilm className="search-empty-icon" />
                            <p>No movies found for &ldquo;{submittedQuery}&rdquo;</p>
                            <p className="search-empty-sub">Try a different title or check the spelling.</p>
                        </div>
                    )}
                    {error && (
                        <div className="search-empty">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
