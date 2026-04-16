import React from "react";
import "../styles/about-lumix.css";

export default function AboutLumix() {

    return (
        <div className="about-page">
            <div className="about-content">
                
                <div className="about-left-column">
                    <h1 className="about-title">About Lumix</h1>
                    
                    <p className="about-description">
                        Lumix is a dedicated platform for movie discovery. We help you explore trending titles, search for specific movies, and keep track of your favorites through local bookmarking.
                    </p>

                    <div className="attribution-section">
                        <img 
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
                            alt="TMDb Logo" 
                            className="tmdb-logo" 
                        />
                        <p className="attribution-text">
                            This product uses the TMDb API but is not endorsed or certified by TMDb.
                        </p>
                    </div>
                </div>

                <div className="about-right-column">
                    <h2 className="faq-title">General Info</h2>
                    
                    <div className="faq-item">
                        <h3 className="faq-question">Your Privacy</h3>
                        <p className="faq-answer">
                            We do not collect or store any personal data on our servers. Your bookmarks are saved exclusively in your browser's local storage, keeping your experience private and local.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question">Data Source</h3>
                        <p className="faq-answer">
                            Our movie data is powered by The Movie Database (TMDb) API. We use their service to provide up-to-date posters, descriptions, and ratings.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question">Can I watch movies on Lumix?</h3>
                        <p className="faq-answer">
                            No, Lumix is a discovery tool and does not provide streaming content. However, you can view official trailers on the movie details pages.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3 className="faq-question">Do I need an account?</h3>
                        <p className="faq-answer">
                            No account is required. Because bookmarks are saved to your browser, you can start using all features immediately without a sign-up.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

