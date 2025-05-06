// src/api.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Ensure this environment variable is set
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchStreamingProviders = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/watch/providers`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching streaming providers:', error);
        return null;
    }
};
