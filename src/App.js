import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
      }}
    >
      <h1>React To-Do App</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "70%", padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem" }}>
          Add
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
