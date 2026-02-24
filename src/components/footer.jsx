import "../styles/footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiGlobe } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assets/lumix-logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Lumix" className="footer-logo" />
            <p className="footer-description">
              Your favorite platform to explore, discover, and bookmark movies
            </p>
          </div>

          <div className="footer-nav">
            <h3 className="nav-title">Navigation</h3>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/search" className="nav-link">Search</Link>
              <Link to="/bookmark" className="nav-link">Bookmarks</Link>
              <Link to="/about" className="nav-link">About Lumix</Link>
            </div>
          </div>

          <div className="footer-socials">
            <h3 className="socials-title">Connect With Us</h3>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/cloue-macadangdang-365133240"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:senp41.mac@gmail.com"
                className="social-link"
                aria-label="Email"
              >
                <MdEmail />
              </a>
              <a
                href="https://clouemac.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Portfolio"
              >
                <BiGlobe />
              </a>
              <a
                href="https://github.com/CloueM"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Lumix. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#" className="legal-link">
              Privacy Policy
            </a>
            <a href="#" className="legal-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
