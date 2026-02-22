import "../styles/header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { MdMovie, MdBookmark } from "react-icons/md";
import { BiCalendar, BiSearch, BiInfoCircle } from "react-icons/bi";
import { RiMovie2Line } from "react-icons/ri";
import logo from "../assets/lumix-logo.svg";
import { fetchMovieDetails } from "../services/movieApi";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showCategoryNav, setShowCategoryNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [movieTitle, setMovieTitle] = useState("");

    // If on a movie page, fetch and show the movie title
    useEffect(() => {
        const movieIdMatch = location.pathname.match(/^\/movie\/(\d+)$/);
        if (movieIdMatch) {
            const movieId = movieIdMatch[1];
            fetchMovieDetails(movieId)
                .then(data => setMovieTitle(data.title))
                .catch(() => setMovieTitle("Movie Details"));
        } else {
            setMovieTitle("");
        }
    }, [location.pathname]);

    // Hide category nav when scrolling down, show when scrolling up
    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowCategoryNav(false);
            } else {
                setShowCategoryNav(true);
            }
            setLastScrollY(currentScrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    function getPageTitle() {
        if (movieTitle) return movieTitle;

        // Map each route path to a page title
        const titles = {
            "/": "Home",
            "/now-playing": "Now Playing",
            "/top-rated": "Top Rated",
            "/popular": "Popular",
            "/upcoming": "Upcoming",
            "/search": "Search",
            "/bookmark": "Bookmark",
            "/about": "About"
        };

        return titles[location.pathname] || "Movie App";
    }

    return (
        <>
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="header-left">
                        <a className="logo-btn" onClick={() => navigate("/")}>
                            <img src={logo} alt="Lumix" className="logo-image" />
                        </a>
                    </div>

                    <div className="header-center">
                        {!location.pathname.startsWith("/movie/") && (
                            <h1 className="page-title">{getPageTitle()}</h1>
                        )}
                    </div>

                    <div className="header-right">
                        <button className="about-btn" onClick={() => navigate("/about")} title="About">
                            <BiInfoCircle />
                        </button>
                    </div>
                </div>
            </div>

            <nav className={`category-nav glass ${!showCategoryNav ? "hidden" : ""}`}>
                <button
                    className={`category-btn ${location.pathname === "/now-playing" ? "active" : ""}`}
                    onClick={() => navigate("/now-playing")}
                    title="Now Playing"
                >
                    <RiMovie2Line />
                </button>
                <button
                    className={`category-btn ${location.pathname === "/top-rated" ? "active" : ""}`}
                    onClick={() => navigate("/top-rated")}
                    title="Top Rated"
                >
                    <AiOutlineStar />
                </button>
                <button
                    className={`category-btn ${location.pathname === "/popular" ? "active" : ""}`}
                    onClick={() => navigate("/popular")}
                    title="Popular"
                >
                    <MdMovie />
                </button>
                <button
                    className={`category-btn ${location.pathname === "/upcoming" ? "active" : ""}`}
                    onClick={() => navigate("/upcoming")}
                    title="Upcoming"
                >
                    <BiCalendar />
                </button>
            </nav>

            <header className="header">
                <nav className="header-nav glass">
                    <button
                        className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
                        onClick={() => navigate("/")}
                        title="Home"
                    >
                        <AiOutlineHome />
                    </button>
                    <button
                        className={`nav-btn ${location.pathname === "/search" ? "active" : ""}`}
                        onClick={() => navigate("/search")}
                        title="Search"
                    >
                        <BiSearch />
                    </button>
                    <button
                        className={`nav-btn ${location.pathname === "/bookmark" ? "active" : ""}`}
                        onClick={() => navigate("/bookmark")}
                        title="Bookmark"
                    >
                        <MdBookmark />
                    </button>
                </nav>
            </header>
        </>
    );
}
