import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../services/config.js";

// hook to get movie logos from tmdb
export function useMovieLogos(moviesInput) {
    // save the logos here mapped by movie id
    const [logos, setLogos] = useState({});

    useEffect(function() {
        // if no movies input, just stop
        if (!moviesInput) {
            return;
        }

        // make sure it's an array, even if we only get one movie (like in view-hero)
        let moviesArray = [];
        if (Array.isArray(moviesInput)) {
            moviesArray = moviesInput;
        } else {
            moviesArray = [moviesInput];
        }

        // if the array is empty, stop
        if (moviesArray.length === 0) {
            return;
        }

        async function fetchAllLogos() {
            let tempLogos = {};

            // check each movie using map
            let promises = moviesArray.map(async function(movie) {
                // see if it is a tv show or a movie
                let type = "movie";
                if (movie.media_type === "tv") {
                    type = "tv";
                }

                // create the url to call the api
                let url = BASE_URL + "/" + type + "/" + movie.id + "/images?api_key=" + API_KEY;
                
                let response = await fetch(url).catch(function() {
                    console.log("Failed to fetch logo for movie id: " + movie.id);
                    return null;
                });
                
                if (response && response.ok) {
                    let data = await response.json();
                    
                    // try to find the english logo first
                    let goodLogo = null;
                    
                    if (data.logos && data.logos.length > 0) {
                        // find all english logos
                        let englishLogos = data.logos.filter(function(logo) {
                            return logo.iso_639_1 === "en";
                        });
                        
                        // if we have english logos use them, otherwise check all logos
                        let logosToCheck = englishLogos.length > 0 ? englishLogos : data.logos;

                        // start by assuming the first one is the best
                        goodLogo = logosToCheck[0];

                        // loop through the rest to find the widest one (highest aspect ratio)
                        // this prevents tall, stacked logos with multiple lines from being chosen
                        for (let j = 1; j < logosToCheck.length; j++) {
                            if (logosToCheck[j].aspect_ratio > goodLogo.aspect_ratio) {
                                goodLogo = logosToCheck[j];
                            }
                        }
                        
                        // save it into our object
                        if (goodLogo && goodLogo.file_path) {
                            tempLogos[movie.id] = goodLogo.file_path;
                        }
                    }
                }
            });

            // wait for all the movies to finish fetching
            await Promise.all(promises);
            
            // set the state to show our logos
            setLogos(tempLogos);
        }

        fetchAllLogos();
        
    }, [moviesInput]);

    // return the logos back to the component
    return logos;
}
