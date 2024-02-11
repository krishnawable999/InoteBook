import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";


function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type) =>{
    // object 
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
  return (
    <BrowserRouter>
      <NoteState>
        <div className="app-container">
          <Navbar/>
          <Alert alert={alert}/>
          <Routes>
            <Route path="/Home" element={<Home showAlert={showAlert} />} />
            <Route path="/About" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
