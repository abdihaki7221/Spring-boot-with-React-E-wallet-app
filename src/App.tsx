import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Alert from "./assets/Components/Alert";
import Button from "./assets/Components/Button";
import Registration from "./assets/Components/Registration";
import SideBackground from "./assets/Components/SideBackground";
import UserState from "./assets/Components/UserState";
import SideForm from "./assets/Components/SideForm";
import { Link, Routes } from "react-router-dom";
import { Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { ExportToken } from "./assets/Components/ExportToken";
import Login from "./assets/Components/Login";
import Home from "./assets/Components/Home";
import ProtectedRoute from "./assets/Components/ProtectedRoute";


function App() {
  
  const[selectVisibility,selectedVisibility] = useState(false)

  return (


    <div >
      <Registration/>
      <Router>
      <Routes>
        // TODO 
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
      
    </div>

    

   
  );
}

export default App;
