import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./App.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [youtubeVideo, setYoutubeVideo] = useState(null);
    const [translations, setTranslations] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");

    const fetchYoutubeVideo = async (title, languageCode) => {
        try {
            const query = `${title} full movie`;
            const youtubeResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
                    query
                )}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&relevanceLanguage=${languageCode}`
            );
            const youtubeData = await youtubeResponse.json();
            if (youtubeData.items && youtubeData.items.length > 0) {
                setYoutubeVideo(youtubeData.items[0]);
            } else {
                setYoutubeVideo(null);
            }
        } catch (error) {
            console.error("Error fetching YouTube video:", error);
        }
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${selectedLanguage}`
                );
                const data = await response.json();
                setMovie(data);

                const translationsResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/translations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
                );
                const translationsData = await translationsResponse.json();

                const uniqueTranslations = Array.from(
                    new Map(
                        translationsData.translations.map((translation) => [
                            translation.iso_639_1,
                            translation,
                        ])
                    ).values()
                );
                setTranslations(
                    uniqueTranslations.map((translation) => ({
                        iso_639_1: translation.iso_639_1,
                        name: translation.english_name,
                    }))
                );

                fetchYoutubeVideo(data.title, selectedLanguage.split("-")[0]);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, selectedLanguage]);

    const handleLanguageChange = (e) => {
        const selectedLang = e.target.value;
        setSelectedLanguage(selectedLang);

        if (movie) {
            fetchYoutubeVideo(movie.title, selectedLang.split("-")[0]);
        }
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!movie) {
        return <p>Movie details not found.</p>;
    }

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
        : "/path/to/fallback-image.jpg";

    return (
        <div className="movie-details-container">
            <img src={posterUrl} alt={movie.title} className="movie-poster" />
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-overview">{movie.overview}</p>
            <p className="movie-info">
                <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="movie-info">
                <strong>Rating:</strong> {movie.vote_average}/10
            </p>

            <div className="section-title">Select Language</div>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                {translations.map((translation) => (
                    <option key={translation.iso_639_1} value={translation.iso_639_1}>
                        {translation.name}
                    </option>
                ))}
            </select>

            <div className="section-title">Watch Now</div>
            {youtubeVideo ? (
                <div className="player-wrapper">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${youtubeVideo.id.videoId}`}
                        controls
                        className="react-player"
                    />
                </div>
            ) : (
                <p>
                    No movie available in{" "}
                    {translations.find((t) => t.iso_639_1 === selectedLanguage)?.name ||
                        "selected language"}{" "}
                    on YouTube.
                </p>
            )}
        </div>
    );
};

export default MovieDetails;
