import React from "react";
import "../styles/about-lumix.css";

export default function AboutLumix() {

    return (
        <div className="about-page">
            <div className="about-content">
                <h1 className="about-title">About Lumix</h1>
                
                <p className="about-description">
                    Lumix is a simple and fast movie discovery platform. We help you find trending movies, check out the top-rated films, and see what is currently playing or coming soon to theaters. Everything you need to discover your next favorite movie is right here.
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
        </div>
    );
}



