/* eslint-disable no-undef */
import React, { useState } from 'react';
import './App.css'
// App.js
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (task.trim() !== '') {
      if (editingTask !== null) {
        // If editingTask is set, update the existing todo
        const updatedTodos = todos.map((todo) =>
          todo.id === editingTask ? { ...todo, task } : todo
        );
        setTodos(updatedTodos);
        setEditingTask(null);
      } else {
        // If editingTask is not set, add a new todo
        setTodos([...todos, { id: Date.now(), task }]);
      }
      setTask('');
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditingTask(null); // Reset editingTask if the task being edited is removed
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTask(todoToEdit.task);
    setEditingTask(id);
  };

  return (
    <div className="container mt-5">
      <h1>Todo App</h1>
      <form onSubmit={addTodo}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add or edit task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              {editingTask !== null ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.task}
            <div>
              <button className="btn btn-warning mr-2" onClick={() => editTodo(todo.id)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => removeTodo(todo.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
