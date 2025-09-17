import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/todos";

export default function TodoEdit() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => setTodo(data));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!todo) return;

    // Keep completed state
    const updatedTodo = { ...todo };

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo)
    });

    navigate("/");
  }

  return (
    <div className="container">
      <h1>Edit Todo</h1>
      {todo && (
        <form onSubmit={handleSubmit} className="form">
          <input
            value={todo.title}
            onChange={e => setTodo({ ...todo, title: e.target.value })}
            placeholder="Edit todo"
          />
          <button type="submit" className="btn">
            Update
          </button>
        </form>
      )}
    </div>
  );
}
