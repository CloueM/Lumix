import { useState, useEffect } from "react";

const STORAGE_KEY = "lumix_favorites";

// hook to save favorite movie in local storage
export function useFavorites() {
    // try to get favorites from local storage first
    const [favorites, setFavorites] = useState(function() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    });

    // save favorites to local storage every time it change
    useEffect(function() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.warn("useFavorites: could not write to localStorage");
        }
    }, [favorites]);

    // return true if movie is in list
    function isFavorite(id) {
        let found = false;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === id) {
                found = true;
                break;
            }
        }
        return found;
    }

    // add or remove movie from list
    function toggleFavorite(movie) {
        setFavorites(function(prev) {
            // check if movie already inside
            let isInside = false;
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id === movie.id) {
                    isInside = true;
                    break;
                }
            }
            
            if (isInside) {
                // remove if inside
                const newList = [];
                for (let i = 0; i < prev.length; i++) {
                    if (prev[i].id !== movie.id) {
                        newList.push(prev[i]);
                    }
                }
                return newList;
            } else {
                // add if not inside
                const newList = [];
                for (let i = 0; i < prev.length; i++) {
                    newList.push(prev[i]);
                }
                newList.push(movie);
                return newList;
            }
        });
    }

    // delete all from list
    function clearFavorites() {
        setFavorites([]);
    }

    return { favorites, isFavorite, toggleFavorite, clearFavorites };
}

