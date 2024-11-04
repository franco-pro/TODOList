import btnCheck from "./assets/img/btncheck.png";
import btnDelete from "./assets/img/btndelete.png";
import viteLogo from "/vite.svg";
import btnSave from "./assets/img/btnsave.png";
import btnFile from "./assets/img/file.png";
import menu from "./assets/img/Menu Btn.png";
import "./styles/App.css";

function App() {
  return (
    <div className="container">
      <div className="header">
        <img className="menu" src={menu} alt="logo menu" />
        <div className="title">
          <img src={btnFile} alt="logo file" />
          <span>Your Todo</span>
        </div>
      </div>
      <div className="body">
        <div className="projects"></div>
        <div className="container"></div>
        <div className="footer">
          designed by <span>franco-pro</span>
        </div>
      </div>
    </div>
  );
}

export default App;
