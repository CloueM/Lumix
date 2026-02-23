import "../styles/header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { MdMovie, MdBookmark } from "react-icons/md";
import { BiCalendar, BiSearch, BiInfoCircle } from "react-icons/bi";
import { RiMovie2Line } from "react-icons/ri";
import logo from "../assets/lumix-logo.svg";
import { fetchMovieDetails } from "../services/movieApi";

// top nav bar
export default function Navbar() {
    const navigate = useNavigate();
    // see what page we are in (using useLocation hook)
    const location = useLocation();
    
    // hide or show category menu
    const [showCategoryNav, setShowCategoryNav] = useState(true);
    // remember scroll position
    const [lastScrollY, setLastScrollY] = useState(0);
    // movie title if we in movie page
    const [movieTitle, setMovieTitle] = useState("");

    // watch for page changes. If the user goes to a movie page, fetch the movie's title
    useEffect(() => {
        // Check if we are on a movie page
        if (location.pathname.includes("/movie/")) {
            // Get the ID from the URL by splitting the string. "/movie/123" becomes ["", "movie", "123"]
            const urlParts = location.pathname.split("/");
            const movieId = urlParts[2];
            
            // get movie details from api
            fetchMovieDetails(movieId)
                .then(function(data) {
                    setMovieTitle(data.title);
                })
                .catch(function() {
                    setMovieTitle("Movie Details");
                });
        } else {
            // clear title when left the movie page
            setMovieTitle("");
        }
    }, [location.pathname]);

    // hide category bar when scroll down. show when scroll up
    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // scroll down past 50px hides nav
                setShowCategoryNav(false);
            } else {
                // scroll up then show it
                setShowCategoryNav(true);
            }
            // Update the last scroll position for the next time user scroll
            setLastScrollY(currentScrollY);
        }

        // listen scroll event
        window.addEventListener("scroll", handleScroll);
        // clean up event
        return function() {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    // Function to decide what title to show at the top based on the current page
    function getPageTitle() {
        if (movieTitle) {
            return movieTitle; // use movie title if got one
        }

        if (location.pathname === "/") {
            return "Home";
        }
        if (location.pathname === "/now-playing") {
            return "Now Playing";
        }
        if (location.pathname === "/top-rated") {
            return "Top Rated";
        }
        if (location.pathname === "/popular") {
            return "Popular";
        }
        if (location.pathname === "/upcoming") {
            return "Upcoming";
        }
        if (location.pathname === "/search") {
            return "Search";
        }
        if (location.pathname === "/bookmark") {
            return "My Favorites";
        }
        if (location.pathname === "/about") {
            return "About";
        }

        // default title fallback
        return "Movie App";
    }

    // class name for category button
    function getCategoryClass(path) {
        if (location.pathname === path) {
            return "category-btn active";
        } else {
            return "category-btn";
        }
    }

    // class name for main nav button
    function getNavClass(path) {
        if (location.pathname === path) {
            return "nav-btn active";
        } else {
            return "nav-btn";
        }
    }

    // build class for category bar
    let categoryNavClass = "category-nav glass";
    if (!showCategoryNav) {
        categoryNavClass = "category-nav glass hidden";
    }

    let isMoviePage = location.pathname.includes("/movie/");

    return (
        <>
            {/* The very top bar showing the logo, page title, and about button */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="header-left">
                        <a className="logo-btn" onClick={function() { navigate("/"); }}>
                            <img src={logo} alt="Lumix" className="logo-image" />
                        </a>
                    </div>

                    <div className="header-center">
                        {/* Only show the page title if we are NOT on a movie page, since 
                            the movie page shows its own big title anyway. */}
                        {!isMoviePage && (
                            <h1 className="page-title">{getPageTitle()}</h1>
                        )}
                    </div>

                    <div className="header-right">
                        <button className="about-btn" onClick={function() { navigate("/about"); }} title="About">
                            <BiInfoCircle />
                        </button>
                    </div>
                </div>
            </div>

            {/* The secondary navigation bar for selecting movie categories */}
            <nav className={categoryNavClass}>
                <button
                    className={getCategoryClass("/now-playing")}
                    onClick={function() { navigate("/now-playing"); }}
                    title="Now Playing"
                >
                    <RiMovie2Line />
                </button>
                <button
                    className={getCategoryClass("/top-rated")}
                    onClick={function() { navigate("/top-rated"); }}
                    title="Top Rated"
                >
                    <AiOutlineStar />
                </button>
                <button
                    className={getCategoryClass("/popular")}
                    onClick={function() { navigate("/popular"); }}
                    title="Popular"
                >
                    <MdMovie />
                </button>
                <button
                    className={getCategoryClass("/upcoming")}
                    onClick={function() { navigate("/upcoming"); }}
                    title="Upcoming"
                >
                    <BiCalendar />
                </button>
            </nav>

            {/* The primary bottom-ish navigation bar for main features (Home, Search, Bookmarks) */}
            <header className="header">
                <nav className="header-nav glass">
                    <button
                        className={getNavClass("/")}
                        onClick={function() { navigate("/"); }}
                        title="Home"
                    >
                        <AiOutlineHome />
                    </button>
                    <button
                        className={getNavClass("/search")}
                        onClick={function() { navigate("/search"); }}
                        title="Search"
                    >
                        <BiSearch />
                    </button>
                    <button
                        className={getNavClass("/bookmark")}
                        onClick={function() { navigate("/bookmark"); }}
                        title="Bookmark"
                    >
                        <MdBookmark />
                    </button>
                </nav>
            </header>
        </>
    );
}

