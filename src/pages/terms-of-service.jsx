import React from "react";
import "../styles/about-lumix.css";

export default function TermsOfService() {
    return (
        <div className="about-page">
            <div className="about-content" style={{ display: 'flex' }}>
                <div className="about-left-column" style={{ width: '100%' }}>
                    <h1 className="about-title">Terms of Service</h1>
                    
                    <p className="about-description">
                        <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>1. Acceptance of Terms</h2>
                    <p className="about-description">
                        By accessing and using Lumix, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>2. Website Purpose</h2>
                    <p className="about-description">
                        Lumix is a free, non-commercial entertainment discovery platform. It is designed to help users search, explore, and bookmark information about movies and television series. Lumix does not host, stream, or distribute any copyrighted video content.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>3. Third-Party Content</h2>
                    <p className="about-description">
                        All movie data, images, and trailers displayed on Lumix are provided by The Movie Database (TMDb) API. Lumix uses the TMDb API but is not endorsed or certified by TMDb. I am not responsible for the accuracy, legality, or content of the data provided by TMDb.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>4. User Responsibility</h2>
                    <p className="about-description">
                        You agree to use Lumix only for lawful purposes. You are solely responsible for maintaining the privacy of your device where your bookmarks are locally stored.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>5. Disclaimer of Warranties</h2>
                    <p className="about-description">
                        Lumix is provided on an "as is" and "as available" basis without any warranties of any kind. We do not guarantee that the site will always be available, secure, or free from errors.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>6. Changes to Terms</h2>
                    <p className="about-description">
                        We reserve the right to modify these terms at any time. Your continued use of Lumix after any changes indicates your acceptance of the new Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
