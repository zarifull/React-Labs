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
return (
    <div className="container">
      <Link to="/" style={{ marginBottom: '20px', display: 'block' }}>
          ← Back to Home
      </Link>
      <input 
  type="text" 
  placeholder="Search tasks..." 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{ marginBottom: '10px', width: '100%', padding: '20px', marginTop: '20px' }}
/>
      <h1>Manage Tasks</h1>
      
      <div className="input-group">
        <input 
          type="text"
          value={input} 
          placeholder='What needs to be done?'
          onChange={(e) => setInput(e.target.value)} 
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option> 
        </select>
        <button onClick={addTask}
        disabled={!isInputEmpty}
        >Add Task</button>
      </div>
      <div className="filter-bar">
        <button 
            onClick={() => setFilter("all")} 
            style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        >
            All
        </button>
        <button 
            onClick={() => setFilter("active")} 
            style={{ fontWeight: filter === "active" ? "bold" : "normal" }}
        >
            Active
        </button>
        <button 
            onClick={() => setFilter("completed")} 
            style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        >
            Completed
        </button>
        </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          /* FIX: All attributes must be INSIDE the opening <div> tag */
          <div 
            key={task.id} 
            className="task-card"
            style={{ 
              borderLeft: `10px solid ${
                task.priority === 'High' ? '#ff7675' : 
                task.priority === 'Medium' ? '#fdcb6e' : '#55efc4'
              }`,
              padding: '15px',
              margin: '10px 0',
              background: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <div>
              <h3 style={{ 
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                    opacity: task.isCompleted ? 0.5 : 1,
                    cursor: 'pointer'
                }}
              onClick={() => toggleCompleted(task.id)}
              >{task.text}</h3>
              <small>Priority: {task.priority}</small>
            </div>
            <button 
              onClick={() => deleteTask(task.id)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      <button onClick={clearAll} style={{ backgroundColor: 'gray', color: 'white' }}>
        Clear All
        </button>
    </div>
  );
}

export default TaskManager
