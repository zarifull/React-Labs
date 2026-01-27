import React,{useState,useMemo,useEffect} from 'react';
import { onCLS } from 'web-vitals';
import { Link } from 'react-router-dom';


const TaskManager = () => {

const [tasks,setTasks]=useState(()=>{
    const saved = localStorage.getItem("myTasks");
    return saved ? JSON.parse(saved) : [];

});
const [input,setInput]=useState("");
const [priority,setPriority]=useState("Medium");
const [filter,setFilter]=useState("All");
const [searchTerm,setSearchTerm]=useState("");

useEffect(() => {
    if (tasks.length > 0) {
        localStorage.setItem("myTasks",JSON.stringify(tasks));
    }
}, [tasks]);
const addTask = () => {
    if(!input.trim()) return;
const isDuplicated = tasks.some(task => task.text.toLowerCase() === input.trim().toLowerCase());
if(isDuplicated){
    alert ("Task already exists!");
    return;
}
const newTask = {
   id: Date.now(),
   text : input,
   priority: priority,
   isCompleted: false,
};
   setTasks([...tasks,newTask]);
    setInput('');
};

const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks (updatedTasks);
}
const clearAll = () => {
    if(window.confirm("Are you sure you want to clear all tasks?")){
        setTasks ([]);
        localStorage.removeItem("myTasks");
    }
};

const toggleCompleted = (id) => {
    setTasks((prevTasks) => 
    prevTasks.map((task => 
    task.id === id ? {...task, isCompleted: !task.isCompleted}: task)));
};

const filteredTasks = useMemo(() => {
  return tasks.filter((task) => {
    const matchesFilter = 
      filter === "all" || 
      (filter === "active" && !task.isCompleted) || 
      (filter === "completed" && task.isCompleted);

    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });
}, [tasks, filter, searchTerm]);

  const isInputEmpty = input.trim().length > 0;

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' && isInputEmpty){
      addTask();
    }
  }
  return (
    <div className="container">
      <Link to="/" style={{color: 'white', fontWeight:'bold'}} >
          ← Back to Home
      </Link>
      
      <div className="task-container">
        <h1 style={{ color: '#6c5ce7', textAlign: 'center' }}>Manage Tasks</h1>
        
        <input 
          type="text" 
          placeholder="🔍 Search tasks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-input" 
          style={{ width: '95%', marginBottom: '20px' }}
        />

        <div className="input-group">
          <input 
            type="text"
            value={input} 
            placeholder='What needs to be done?'
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleKeyPress}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">🔥 High</option>
            <option value="Medium">⚡ Medium</option>
            <option value="Low">🍃 Low</option> 
          </select>
          <button 
            onClick={addTask}
            disabled={!isInputEmpty}
            className="sort-button"
            style={{ background: isInputEmpty ? '#6c5ce7' : '#6c5ce7' }}
          >
            Add Task
          </button>
        </div>

        <div className="filter-bar">
          {['all', 'active', 'completed'].map((f) => (
            <button 
                key={f}
                onClick={() => setFilter(f)} 
                className={`filter-btn ${filter === f ? 'active' : ''}`}
            >
                {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className="task-card"
                style={{ 
                  background: '#f8f9fa',
                  borderLeft: `10px solid ${
                    task.priority === 'High' ? '#e03131' : 
                    task.priority === 'Medium' ? '#fab005' : '#087f5b'
                  }`,
                  padding: '15px',
                  margin: '10px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '12px'
                }}
              >
                <div>
                  <h3 style={{ 
                        margin: 0,
                        textDecoration: task.isCompleted ? 'line-through' : 'none',
                        color: task.isCompleted ? '#aaa' : '#2d3436',
                        cursor: 'pointer'
                    }}
                    onClick={() => toggleCompleted(task.id)}
                  >
                    {task.text}
                  </h3>
                  <small style={{ color: '#636e72' }}>Priority: {task.priority}</small>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: 'white', opacity: 0.8 }}>No tasks found...</p>
          )}
        </div>

        <button onClick={clearAll} className="clear-btn">
          Clear All Tasks
        </button>
      </div>
    </div>
  );
}

export default TaskManager
