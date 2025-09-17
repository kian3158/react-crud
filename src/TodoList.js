import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "./add.png";
import EditIcon from "./edit.png";
import DeleteIcon from "./delete.png";


const API_URL = "http://localhost:5000/todos";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(API_URL);
    setTodos(await res.json());
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTodos();
  }

  async function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    fetchTodos();
  }


  return (
    <div className="container">
      <h1>Todos</h1>
      <Link to="/add" className="btn">
        <img src={AddIcon} alt="Add" className="icon" />
      </Link>
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span>{todo.title}</span>
            <div className="actions">
              <button onClick={() => toggleComplete(todo.id)} className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#32c235" d="M9 18.25a.74.74 0 0 1-.53-.25l-5-5a.75.75 0 1 1 1.06-1L9 16.44L19.47 6a.75.75 0 0 1 1.06 1l-11 11a.74.74 0 0 1-.53.25"/></svg>
              </button>
              <Link to={`/edit/${todo.id}`} className="btn">
                <img src={EditIcon} alt="Edit" className="icon" />
              </Link>
              <button onClick={() => deleteTodo(todo.id)} className="btn">
                <img src={DeleteIcon} alt="Delete" className="icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
