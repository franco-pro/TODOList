import btnFile from "./assets/img/file.png";
import menu from "./assets/img/Menu Btn.png";
import "./styles/App.css";
import { TodoList } from "./components/todoItem/TodoItem";
import { useEffect } from "react";
import Form from "./components/todoItem/Form";
import { useDispatch } from "react-redux";
import { getDatas } from "./features/todos/TodoSlice";
import { AppDispatch } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getDatas());
  }, [dispatch]);
  return (
    <>
      <Form />
      <div className="containerDiv">
        <div className="header">
          <img className="menu" src={menu} alt="logo menu" />
          <div className="title">
            <img src={btnFile} alt="logo file" />
            <span>Your Todo</span>
          </div>
        </div>
        <div className="body">
          <div className="projects"></div>
          <div className="container">
            <TodoList />
          </div>
        </div>
        <div className="footer">
          designed by <span>franco-pro</span>
        </div>
      </div>
    </>
  );
}

export default App;
