import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieList.module.cs';

const MovieGallery = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                        // Add other parameters as needed
                    },
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const baseImgUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500';

    return (
        <div className="movie-gallery">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-item">
                    {movie.poster_path ? (
                        <img
                            src={`${baseImgUrl}${size}${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: '200px', borderRadius: '8px' }}
                        />
                    ) : (
                        <div style={{ width: '200px', height: '300px', backgroundColor: '#ccc' }}>
                            No Image
                        </div>
                    )}
                    <h3>{movie.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default MovieGallery;
