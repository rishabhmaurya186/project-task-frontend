import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginForm from "./Pages/LoginForm";
import SignUpForm from "./Pages/SignUpForm";
import Layout from "./components/Layout.jsx";
import Forgotten from "./Pages/Forgot.jsx";
import OTPVerification from "./Pages/OTPVerification.jsx";
import HomeLayout from "./Pages/HomeLayout.jsx";
import DashboardLayoyt from "./Pages/DashboardLayoyt.jsx";
import Car from "./components/Car/Car.jsx";
import BuyCar from "./components/BuyCar/BuyCar.jsx";
import MyCar from "./components/MyCar/MyCar.jsx";
import AddCar from "./components/AddCar/AddCar.jsx";
import SoldCarList from "./components/SoldCar/SoldCarList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<HomeLayout/>}>
       <Route path="" element={<LoginForm />} /> 
       <Route path="signup" element={<SignUpForm />} />
       <Route path="login" element={<LoginForm />} />
        <Route path="forgot" element={<Forgotten />} />
        <Route path="otpverification" element={<OTPVerification />} />
        </Route>
    <Route path="profile" element={<DashboardLayoyt />}>
      <Route path="dashboard" element={<Car />} />
      <Route path="buycar" element={<BuyCar/>}>
        
      </Route>
      <Route path="mycar" element={<MyCar/>}/>
      <Route path="addcar" element={<AddCar/>}/>
      <Route path="soldcar" element={<SoldCarList/>}/>
      <Route path="mydeal" element={<> for dealer</>}/>
    </Route>
    </Route>
    
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
