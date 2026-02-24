import React from "react";
import "../styles/about-lumix.css";

export default function PrivacyPolicy() {
    return (
        <div className="about-page">
            <div className="about-content" style={{ display: 'flex' }}>
                <div className="about-left-column" style={{ width: '100%' }}>
                    <h1 className="about-title">Privacy Policy</h1>
                    
                    <p className="about-description">
                        <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>1. Information Collection and Storage</h2>
                    <p className="about-description">
                        Lumix is designed to respect your privacy. This website does not require an account, does not use tracking cookies, and does not collect, store, or transmit any of your personal data to my servers.
                    </p>
                    <p className="about-description">
                        When you use the bookmarking feature, your saved movies and TV shows are stored locally within your own internet browser using a standard web technology called "Local Storage". This means your data remains entirely on your device and is not accessible by me.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>2. Third-Party Services</h2>
                    <p className="about-description">
                        Lumix uses The Movie Database (TMDb) API to display movie posters, descriptions, ratings, and related media. By using Lumix, you are interacting with TMDb's services to retrieve this generalized data. Please note that TMDb may have its own privacy policies regarding API requests.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>3. Data Deletion</h2>
                    <p className="about-description">
                        Because your bookmarks are stored solely on your device, you have complete control over this data. You can delete your bookmarks at any time by clearing your browser's local cache or history.
                    </p>

                    <h2 className="faq-title" style={{marginTop: '2rem'}}>4. Changes to this Policy</h2>
                    <p className="about-description">
                        I may occasionally update this Privacy Policy. Any changes will be posted on this page with an updated revision date.
                    </p>
                </div>
            </div>
        </div>
    );
}
