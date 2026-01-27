import './styles.css';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending,setIscending]=useState(false);

useEffect(() => {
  const savedTeam = localStorage.getItem('myTeam');
  
  if (savedTeam) {
    setData(JSON.parse(savedTeam));
    setLoading(false);
  } else {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
}, []);

useEffect(() => {
  if (data.length > 0) {
    localStorage.setItem('myTeam', JSON.stringify(data));
  }
}, [data]);

  const filteredUsers = useMemo(() => {
    let result = data;

    if (searchTerm.length >= 3) {
      result = data.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (isAscending) {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [data, searchTerm, isAscending]);

  const highlightMatch = (name, query) => {
    if (query.length < 3) return name;
    const parts = name.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <b key={index} style={{ color: 'red' }}>{part}</b>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const deleteUser = (id) => {
    setData(prevData => prevData.filter(user => user.id !== id));
  }
  const resetTeam = () => {
    localStorage.removeItem('myTeam');
    
    setData([]);
    
    setLoading(true);
    
    window.location.reload(); 
  };
  if (loading) return <div className="status">Жүктөлүүдө...</div>;
  if (error) return <div className="status" style={{color: 'red'}}>Ката: {error}</div>;

  return (
    <div className="container">
      <Link to="/" style={{ marginBottom: '20px', display: 'block' }}>
          ← Back to Home
      </Link>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name (min 3 chars)..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={()=> setIscending(!isAscending)} className="sort-button"> 
        {isAscending ? "Sorted A-Z" : "Sort A-Z"}
        </button>
      </div>

      <div className="user-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.id} className="card">
              <h3>👤 {highlightMatch(user.name, searchTerm)}</h3>
              <p>📧 {user.email}</p>
              <p>🏢 {user.company.name}</p>
              <button onClick={() => deleteUser(user.id)} className="delete-button">Delete</button>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>🔍 No users found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      <button onClick={resetTeam} className="reset-button">
  Reset Team
</button>
    </div>
  );
}

export default App;