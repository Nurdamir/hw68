import React from 'react';
import './App.css';
import TaskForm from "./components/TaskForm/TaskForm";
import Tasks from "./container/Tasks/Tasks";

function App() {
  return (
    <div className="App">
      <TaskForm/>

      <Tasks/>
    </div>
  );
}

export default App;
