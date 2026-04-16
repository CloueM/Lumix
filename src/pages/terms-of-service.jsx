import React from "react";
import "../styles/policy.css";

export default function TermsOfService() {
    return (
        <div className="policy-page">
            <div className="policy-content">
                <h1 className="policy-title">Terms of Service</h1>
                
                <p className="policy-date">
                    <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                </p>

                <h2 className="policy-section-title">1. Acceptance of Terms</h2>
                <p className="policy-text">
                    By accessing and using Lumix, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
                </p>

                <h2 className="policy-section-title">2. Website Purpose</h2>
                <p className="policy-text">
                    Lumix is a free, non-commercial entertainment discovery platform. It is designed to help users search, explore, and bookmark information about movies and television series. Lumix does not host, stream, or distribute any copyrighted video content.
                </p>

                <h2 className="policy-section-title">3. Third-Party Content</h2>
                <p className="policy-text">
                    Movie data, images, and trailers are provided by The Movie Database (TMDb). While Lumix uses the TMDb API, it is not endorsed or certified by them. We are not responsible for the accuracy or legality of the data provided by external services.
                </p>

                <h2 className="policy-section-title">4. User Responsibility</h2>
                <p className="policy-text">
                    You agree to use Lumix for lawful purposes only. You are responsible for maintaining the privacy of your device where your bookmarks are stored.
                </p>

                <h2 className="policy-section-title">5. Disclaimer</h2>
                <p className="policy-text">
                    Lumix is provided "as is" without warranties of any kind. We do not guarantee that the site will always be available, secure, or free from errors.
                </p>

                 <h2 className="policy-section-title">6. Changes to Terms</h2>
                <p className="policy-text">
                    We reserve the right to modify these terms at any time. Your continued use of Lumix after changes indicates your acceptance of the new Terms of Service.
                </p>
            </div>
        </div>
    );
}
