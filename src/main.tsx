import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'boxicons/dist/boxicons.js'
import Popper from 'popper.js';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import Login from './assets/Components/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './assets/Components/Home'
import ConfirmOtp from './assets/Components/ConfirmOtp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <App></App>
   

  },
  {
    path: "/Otp-Verify",
    element: <ConfirmOtp></ConfirmOtp>
    

  },
  {
    path: "/home",
    element: <Home/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
