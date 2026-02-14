import '../styles/components/header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineStar } from 'react-icons/ai';
import { MdMovie, MdBookmark } from 'react-icons/md';
import { BiCalendar, BiSearch, BiInfoCircle } from 'react-icons/bi';
import { RiMovie2Line } from 'react-icons/ri';
import { HiMenu } from 'react-icons/hi';
import logo from '../assets/lumix-logo.svg';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showCategoryNav, setShowCategoryNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Get page title based on current route
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Home';
            case '/now-playing':
                return 'Now Playing';
            case '/top-rated':
                return 'Top Rated';
            case '/popular':
                return 'Popular';
            case '/upcoming':
                return 'Upcoming';
            case '/search':
                return 'Search';
            case '/bookmark':
                return 'Bookmark';
            case '/about':
                return 'About';
            default:
                return 'Movie App';
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down
                setShowCategoryNav(false);
            } else {
                // Scrolling up
                setShowCategoryNav(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <>
            {/* Top Bar - Logo, Title, and About */}
            <div className="top-bar">
                <div className="top-bar-container">
                    <div className="header-left">
                        <a className="logo-btn" onClick={() => navigate('/')}>
                            <img src={logo} alt="Lumix" className="logo-image" />
                        </a>
                    </div>

                    {/* Page Title */}
                    <div className="header-center">
                        <h1 className="page-title">{getPageTitle()}</h1>
                    </div>

                    {/* About Button */}
                    <div className="header-right">
                        <button className="about-btn" onClick={() => navigate('/about')} title="About">
                            <BiInfoCircle />
                        </button>
                    </div>
                </div>

            </div>
            {/* Category Navigation - Centered at bottom */}
            <nav className={`category-nav ${!showCategoryNav ? 'hidden' : ''}`}>
                <button className="category-btn" onClick={() => navigate('/now-playing')} title="Now Playing">
                    <RiMovie2Line />
                </button>
                <button className="category-btn" onClick={() => navigate('/top-rated')} title="Top Rated">
                    <AiOutlineStar />
                </button>
                <button className="category-btn" onClick={() => navigate('/popular')} title="Popular">
                    <MdMovie />
                </button>
                <button className="category-btn" onClick={() => navigate('/upcoming')} title="Upcoming">
                    <BiCalendar />
                </button>
            </nav>

            {/* Bottom Bar - Main Navigation */}
            <header className="header">
                <nav className="header-nav">
                    <button className="nav-btn" onClick={() => navigate('/')} title="Home">
                        <AiOutlineHome />
                    </button>
                    <button className="nav-btn" onClick={() => navigate('/search')} title="Search">
                        <BiSearch />
                    </button>
                    <button className="nav-btn" onClick={() => navigate('/bookmark')} title="Bookmark">
                        <MdBookmark />
                    </button>
                </nav>
            </header>
        </>
    );
}

