import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addTodo } from "../../features/todos/TodoSlice";
import "./todoItem.css";

const Form: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [important, setImportant] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleImportant = () => {
    setImportant((important) => !important);
  };
  const handleUrgent = () => {
    setUrgent((urgent) => !urgent);
    console.log(urgent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      dispatch(addTodo({ taskName, urgent, important }));
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="containerForm">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Ajouter une tâche"
      />
      <div className="selectDiv">
        <div className="selectImportant">
          <select onChange={handleImportant}>
            <option value="0">Pas Important</option>
            <option value="1">Important</option>
          </select>
        </div>
        <div className="selectUrgent">
          <select onChange={handleUrgent}>
            <option value="0">Pas Urgent</option>
            <option value="1">Urgent</option>
          </select>
        </div>
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default Form;
