import React,{useState} from 'react';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
    const [query,setQuery] = useState('');
    const [movies,setMovies] = useState([]);
    const [error,setError] = useState(null);

    const searchMovies = async (e) => {
        if (e) e.preventDefault();
        setError("");
    
        const apiKey = "f918545f";
        const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setMovies([]); 
                setError(data.Error); 
            }
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            searchMovies();
        }
    }
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
                        onKeyDown={onKeyDown}
                    />
                    <button onClick={searchMovies} className="sort-button">Search</button>
                </div>
                    {movies.length > 0 && (
                        <p style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                            Found <strong>{movies.length}</strong> results for "{query}"
                        </p>
                    )}

                    {error && (
                        <p style={{ color: '#ff6b6b', textAlign: 'center', fontWeight: 'bold' }}>
                            ❌ {error}
                        </p>
                    )}
                <div className="user-grid">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="card">
                            <img 
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} 
                                alt={movie.Title}
                                style={{ width: '100%', borderRadius: '15px' }}
                            />
                            <h3 style={{ marginTop: '15px' }}>{movie.Title}</h3>
                            <p>📅 Year: {movie.Year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default MovieSearch
