import { useState, useRef, useEffect } from "react";
import { FaRegBookmark, FaTrash, FaLayerGroup, FaEye, FaCheckCircle, FaClock, FaChevronDown } from "react-icons/fa";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/movie-card";
import { IMAGE_BASE_URL } from "../services/movieApi";
import "../styles/search.css";
import "../styles/favorites.css";

// page that shows saved movies
export default function UserBookmark() {
    // get favorites list from hook
    const { favorites, clearFavorites } = useFavorites();
    // track if confirm box is open
    const [showConfirm, setShowConfirm] = useState(false);
    // filter state
    const [activeFilter, setActiveFilter] = useState("All");
    // dropdown state for mobile
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const filters = [
        { name: "All", icon: <FaLayerGroup /> },
        { name: "Watching", icon: <FaEye /> },
        { name: "Completed", icon: <FaCheckCircle /> },
        { name: "Plan To Watch", icon: <FaClock /> }
    ];

    const activeFilterObj = filters.find(f => f.name === activeFilter) || filters[0];

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    // click clear all button
    function handleClearClick() {
        setShowConfirm(true);
    }

    // click ok on confirm box
    function confirmClear() {
        clearFavorites();
        setShowConfirm(false);
    }

    // click cancel on confirm box
    function cancelClear() {
        setShowConfirm(false);
    }

    const handleFilterSelect = (filterName) => {
        setActiveFilter(filterName);
        setIsDropdownOpen(false);
    };

    // Helper to get count for a filter
    const getCount = (filterName) => {
        if (filterName === "All") return favorites.length;
        return favorites.filter(m => m.status === filterName).length;
    };

    // Filter results
    const filteredFavorites = favorites.filter(movie => {
        if (activeFilter === "All") return true;
        return movie.status === activeFilter;
    });

    // class name for container depending on results
    let containerClass = "search-page favorites-page";
    if (favorites.length > 0) {
        containerClass = "search-page favorites-page search-page--has-results";
    }

    // handle how many text is shown
    let movieText = "movies";
    if (filteredFavorites.length === 1) {
        movieText = "movie";
    }

    return (
        <div className={containerClass}>
            {/* show empty message if nothing inside list */}
            {favorites.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="search-grid">
                    <div className="search-results-header">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingRight: "1rem" }}>
                            <div>
                                <h2 className="search-results-title">My Watchlist</h2>
                            </div>
                            <button
                                className="clear-all-btn"
                                onClick={handleClearClick}
                                aria-label="Clear all favorites"
                            >
                                <FaTrash style={{ fontSize: "0.75rem" }} />
                                Clear All
                            </button>
                        </div>
                    </div>

                    {/* Desktop filters - hidden on mobile via CSS */}
                    <div className="favorite-filters desktop-filters">
                        {filters.map(filter => (
                            <button
                                key={filter.name}
                                className={`filter-btn ${activeFilter === filter.name ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.name)}
                            >
                                <span className="filter-icon">{filter.icon}</span>
                                <div className="filter-label-group">
                                    <span className="filter-label">{filter.name}</span>
                                    <span className="filter-count">{getCount(filter.name)}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Mobile filter dropdown - hidden on desktop via CSS */}
                    <div className="mobile-filter-container" ref={dropdownRef}>
                        <button 
                            className="mobile-filter-trigger glass"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className="trigger-content">
                                <span className="filter-icon">{activeFilterObj.icon}</span>
                                <span className="filter-label">{activeFilterObj.name}</span>
                                <span className="filter-count">{getCount(activeFilter)}</span>
                            </div>
                            <FaChevronDown className={`chevron ${isDropdownOpen ? 'open' : ''}`} />
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="mobile-filter-menu glass">
                                {filters.map(filter => (
                                    <button
                                        key={filter.name}
                                        className={`mobile-filter-item ${activeFilter === filter.name ? 'active' : ''}`}
                                        onClick={() => handleFilterSelect(filter.name)}
                                    >
                                        <div className="item-left">
                                            <span className="filter-icon">{filter.icon}</span>
                                            <span className="filter-label">{filter.name}</span>
                                        </div>
                                        <span className="filter-count">{getCount(filter.name)}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* regular map for movies list */}
                    {filteredFavorites.length > 0 ? (
                        filteredFavorites.map(function(movie) {
                            return (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    IMAGE_BASE_URL={IMAGE_BASE_URL}
                                />
                            );
                        })
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
                            No movies in "{activeFilter}" category.
                        </div>
                    )}
                </div>
            )}

            {/* popup box to check user really want to delete */}
            {showConfirm && (
                <div className="favorites-modal-overlay">
                    <div className="favorites-modal">
                        <h3>Clear Favorites</h3>
                        <p>Are you sure you want to remove all movies from your Favorites?</p>
                        <div className="favorites-modal-actions">
                            <button className="favorites-modal-btn clear" onClick={confirmClear}>
                                Clear
                            </button>
                            <button className="favorites-modal-btn cancel" onClick={cancelClear}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// show this component if list is empty
function EmptyState() {
    return (
        <div className="favorites-empty">
            <div className="favorites-empty-icon">
                <FaRegBookmark />
            </div>
            <h2 className="favorites-empty-title">No favorites yet</h2>
            <p className="favorites-empty-sub">
                Hover over any movie card and click the bookmark icon to save it here.
                Your favorites are stored locally on this device.
            </p>
        </div>
    );
}
