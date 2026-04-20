import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaEye, FaCheck, FaClock, FaTrash, FaCheckCircle } from "react-icons/fa";
import "../styles/bookmark-menu.css";

export default function BookmarkMenu({ movie, position, onClose, getFavoriteStatus, updateFavoriteStatus, removeFavorite }) {
    const menuRef = useRef(null);

    // Global coordination: close if another menu opens
    useEffect(() => {
        function handleGlobalClose(e) {
            if (e.detail && e.detail.movieId !== movie.id) {
                onClose();
            }
        }
        window.addEventListener("lumix-close-menus", handleGlobalClose);
        return () => window.removeEventListener("lumix-close-menus", handleGlobalClose);
    }, [movie.id, onClose]);

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        }
        const timeout = setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
        }, 10);
        return () => {
            clearTimeout(timeout);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    // close when pressing escape
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!position || !movie) return null;

    const currentStatus = getFavoriteStatus(movie.id);

    function handleStatusClick(e, status) {
        e.stopPropagation();
        updateFavoriteStatus(movie, status);
        onClose();
    }

    function handleRemove(e) {
        e.stopPropagation();
        removeFavorite(movie.id);
        onClose();
    }

    // calculate position to avoid going off screen
    let top = position.y + 10;
    let left = position.x - 50;

    // Bounds check relative to viewport
    const viewportTop = top - window.scrollY;
    const viewportLeft = left - window.scrollX;

    if (window.innerHeight - viewportTop < 250) {
        top = position.y - 240;
    }
    if (window.innerWidth - viewportLeft < 200) {
        left = position.x - 150;
    }

    const filters = [
        { name: "Watching", icon: <FaEye /> },
        { name: "Completed", icon: <FaCheck /> },
        { name: "Plan To Watch", icon: <FaClock /> }
    ];

    return createPortal(
        <>
            <div
                className="bookmark-menu glass"
                ref={menuRef}
                style={{ top: top, left: left }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bookmark-menu-header">Save to list</div>
                <div className="bookmark-menu-list">
                    {filters.map(filter => (
                        <button
                            key={filter.name}
                            className={`bookmark-menu-item ${currentStatus === filter.name ? 'active' : ''}`}
                            onClick={(e) => handleStatusClick(e, filter.name)}
                        >
                            <span className="bookmark-menu-item-left">
                                <span className="item-icon">{filter.icon}</span>
                                {filter.name}
                            </span>
                        </button>
                    ))}
                </div>
                {currentStatus && (
                    <div className="bookmark-menu-footer">
                        <button className="bookmark-menu-remove" onClick={handleRemove}>
                            <FaTrash className="item-icon" />
                            Remove
                        </button>
                    </div>
                )}
            </div>
        </>,
        document.body
    );
}
