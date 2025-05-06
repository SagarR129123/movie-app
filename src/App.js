import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext"; // Theme context for dark/light mode
import SearchBar from "./components/SearchBar"; // Import SearchBar
import MovieLists from "./components/MovieList";
import MovieDetails from "./components/MovieDetail";
import SearchResults from "./components/SearchResult";
import AuthForm from "./AuthForm"; // Import the AuthForm component 
import "./components/App.css"; // Main app CSS

const App = () => {
    const { isDarkTheme, toggleTheme } = useTheme(); // Access theme state and toggle function
    const [searchQuery, setSearchQuery] = useState(""); // State to store search query
    const navigate = useNavigate(); // React Router's navigation hook

    // Function to handle search from the SearchBar
    const handleSearch = (query) => {
        setSearchQuery(query); // Update the search query state
        navigate(`/search?q=${query}`); // Navigate to the search results page
    };

    return (
        <div className={isDarkTheme ? "app dark-theme" : "app light-theme"}>
            <header className="app-header">
                <h1>Movie Buzz</h1>
                <button onClick={toggleTheme} className="theme-toggle-button">
                    Switch to {isDarkTheme ? "Light" : "Dark"} Theme
                </button>
                <button onClick={() => navigate("/auth")} className="auth-button">
                    Login/Register
                </button>
            </header>
            <main>
                <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch to SearchBar */}
                <Routes>
                    <Route path="/" element={<MovieLists />} />
                    <Route path="/movies" element={<MovieLists />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/auth" element={<AuthForm />} /> {/* Add route for AuthForm */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
           
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
