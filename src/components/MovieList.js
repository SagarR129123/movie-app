import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure styles are included here

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        params: {
                            api_key: process.env.REACT_APP_TMDB_API_KEY,
                        },
                    }
                );
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="search-result">
            <h2>NEW RELEASES</h2>
            <div className="results-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="result-item">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        ) : (
                            <div className="movie-poster-placeholder">No Image</div>
                        )}
                        <h3>{movie.title}</h3>
                        <Link to={`/movie/${movie.id}`} className="watch-button">
                            Watch Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
