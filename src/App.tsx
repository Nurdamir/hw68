import React from 'react';
import TaskForm from "./components/TaskForm/TaskForm";
import Tasks from "./container/Tasks/Tasks";
import './App.css';

function App() {
  return (
    <div className="App">
      <TaskForm/>
      <Tasks/>
    </div>
  );
}

export default App;
