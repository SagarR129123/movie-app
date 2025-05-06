import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './App.css'; // Ensure your CSS file contains the styles for the hover effect

const SearchResults = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&language=en-US`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch movies.');
                }
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchMovies();
    }, [query]);

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="search-result">
            <h2>Search Results for: {query}</h2>
            {movies.length ? (
                <ul className="results-list">
                    {movies.map((movie) => (
                        <li key={movie.id} className="result-item">
                            <div className="movie-item">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                                            : '/path/to/fallback-image.jpg'
                                    }
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                            </div>
                            <h3>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                            <Link to={`/movie/${movie.id}`} className="watch-button">
                                Watch Now
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found for "{query}".</p>
            )}
        </div>
    );
};

export default SearchResults;
