import "../styles/components/footer.css"
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BiGlobe } from 'react-icons/bi';
import logo from '../assets/lumix-logo.svg';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section - Get in Touch */}
                <div className="footer-left">
                    <div className="vertical-line"></div>
                    <div className="footer-content">
                        <h3 className="footer-title">GET IN TOUCH</h3>
                        <div className="footer-links">
                            <a href="https://www.linkedin.com/in/cloue-macadangdang-365133240" target="_blank" rel="noopener noreferrer" className="footer-link">
                                <FaLinkedin className="footer-icon" />
                                <span>LINKEDIN</span>
                            </a>
                            <a href="mailto:senp41.mac@gmail.com" className="footer-link">
                                <MdEmail className="footer-icon" />
                                <span>GMAIL</span>
                            </a>
                            <a href="https://clouemac.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
                                <BiGlobe className="footer-icon" />
                                <span>PORTFOLIO</span>
                            </a>
                            <a href="https://github.com/CloueM" target="_blank" rel="noopener noreferrer" className="footer-link">
                                <FaGithub className="footer-icon" />
                                <span>GITHUB</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Section - Copyright */}
                <div className="footer-right">
                    <img src={logo} alt="Lumix" className="footer-logo" />
                    <div className="footer-copyright">
                        <div className="horizontal-line"></div>
                        <p className="copyright-text">@2025 LUMIX</p>
                        <p className="rights-text">ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
