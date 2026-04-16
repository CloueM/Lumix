import "../styles/header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdBookmark } from "react-icons/md";
import { BiSearch, BiInfoCircle } from "react-icons/bi";
import logo from "../assets/lumix-logo.svg";

// top nav bar
export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // class name for main nav button
    function getNavClass(path) {
        if (location.pathname === path) {
            return "nav-btn active";
        } else {
            return "nav-btn";
        }
    }

    return (
        <>
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="header-left">
                        <a className="logo-btn" onClick={function() { navigate("/"); }}>
                            <img src={logo} alt="Lumix" className="logo-image" />
                        </a>
                    </div>



                    <div className="header-right">
                        <button 
                            className={"nav-btn about-nav-btn " + (location.pathname === "/about" ? "active" : "")} 
                            onClick={function() { navigate("/about"); }} 
                            title="About"
                        >
                            <BiInfoCircle />
                            <span className="nav-label-bottom">About</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* The primary bottom-ish navigation bar for main features (Home, Search, Bookmarks) */}
            <header className="header">
                <nav className="header-nav glass">
                    <button
                        className={getNavClass("/")}
                        onClick={function() { navigate("/"); }}
                        title="Home"
                    >
                        <AiOutlineHome />
                        <span className="nav-label-bottom">Home</span>
                    </button>
                    <button
                        className={getNavClass("/search")}
                        onClick={function() { navigate("/search"); }}
                        title="Search"
                    >
                        <BiSearch />
                        <span className="nav-label-bottom">Search</span>
                    </button>
                    <button
                        className={getNavClass("/bookmark")}
                        onClick={function() { navigate("/bookmark"); }}
                        title="Bookmark"
                    >
                        <MdBookmark />
                        <span className="nav-label-bottom">Bookmark</span>
                    </button>
                </nav>
            </header>
        </>
    );
}

