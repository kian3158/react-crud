import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/todos"; 

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false })
    });
    navigate("/");
  }

  return (
    <div className="container">
      <h1>Add Todo</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter todo"
        />
        <button type="submit" className="btn btn-add">Save</button>
      </form>
    </div>
  );
}
