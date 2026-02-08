import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from './hooks/useFetch';
import { useMovieStore } from './store/useMovieStore';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const { favorites, toggleFavorite, clearFavorites } = useMovieStore();

    const { data: movies, loading, error } = useFetch(searchUrl);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (query.trim()) {
            setSearchUrl(`https://www.omdbapi.com/?s=${query.trim()}&apikey=${import.meta.env.VITE_MOVIES_API_KEY}`);
        }
    };

 
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim().length > 2) {
                setSearchUrl(`https://www.omdbapi.com/?s=${query.trim()}&apikey=${import.meta.env.VITE_MOVIES_API_KEY}`);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const displayedMovies = showFavoritesOnly ? favorites : movies;

    return (
        <div className="container">
            <Link to="/" className="back-link">← Back to Home</Link>
            
            <div className="task-container">
                <h2 style={{ color: 'white', textAlign: 'center' }}>🎬 Cinema Lab</h2>
                
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search for a movie (e.g. Batman)..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch} className="sort-button">Search</button>
                </div>

                {movies?.length > 0 && !showFavoritesOnly && (
                    <p style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                        Found <strong>{movies.length}</strong> results for "{query}"
                    </p>
                )}

                {loading && <p style={{color: 'white', textAlign: 'center'}}>🌀 Loading...</p>}
                {error && <p style={{color: '#ff6b6b', textAlign: 'center'}}>❌ {error}</p>}

                <button 
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className="sort-button"
                    style={{ 
                        marginBottom: '20px', 
                        background: showFavoritesOnly ? '#ff6b6b' : '#4a90e2',
                        width: '100%' 
                    }}
                >
                    {showFavoritesOnly ? "Show All Movies" : `View My Favorites ❤️ (${favorites.length})`}
                </button>

                <div className="user-grid">
                    {displayedMovies?.map((movie, index) => {
                        const isFav = favorites.some(fav => fav.imdbID === movie.imdbID);
                        return (
                            <div key={`${movie.imdbID}-${index}`} className="card">
                                <img 
                                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} 
                                    alt={movie.Title}
                                    style={{ width: '100%', borderRadius: '15px', height: '300px', objectFit: 'cover' }}
                                />
                                <div style={{ padding: '10px' }}>
                                    <h3 style={{ fontSize: '1.1rem', minHeight: '3em' }}>{movie.Title}</h3>
                                    <p>📅 {movie.Year}</p>
                                    <button 
                                        onClick={() => toggleFavorite(movie)}
                                        style={{
                                            background: 'transparent', 
                                            border: 'none', 
                                            fontSize: '28px', 
                                            cursor: 'pointer',
                                            marginTop: '10px'
                                        }}
                                    >
                                        {isFav ? "❤️" : "🤍"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {showFavoritesOnly && favorites.length === 0 && (
                    <p style={{ color: '#aaa', textAlign: 'center', marginTop: '20px' }}>
                        Your favorites list is currently empty. 🍿
                    </p>
                )}

                {showFavoritesOnly && favorites.length > 0 && (
                    <button 
                        onClick={() => window.confirm("Clear all favorites?") && clearFavorites()} 
                        className="sort-button" 
                        style={{ background: '#ff4d4d', marginTop: '30px', width: '100%' }}
                    >
                        Clear All Favorites 🗑️
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;