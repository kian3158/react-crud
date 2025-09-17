import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import TodoEdit from "./TodoEdit";
import "./App.css"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<TodoForm />} />
        <Route path="/edit/:id" element={<TodoEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
