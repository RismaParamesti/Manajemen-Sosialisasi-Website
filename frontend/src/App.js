import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const LayoutAdmin = lazy(() => import("./containers/LayoutAdmin"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));

// Initializing different libraries
initializeApp();

function App() {
  useEffect(() => {
  themeChange(false);

  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");

  console.log("TOKEN:", token);
  console.log("EXPIRES AT:", expiresAt);
  console.log("WAKTU SEKARANG:", Date.now());

  if (token && expiresAt && Date.now() > parseInt(expiresAt)) {
    console.log("Session expired — langsung logout");
    localStorage.clear();
    window.location.href = "/login";
  }

  if (token && expiresAt) {
    const remaining = parseInt(expiresAt) - Date.now();
    console.log("Waktu tersisa sebelum logout (ms):", remaining);

    setTimeout(() => {
      console.log("Auto logout triggered!");
      localStorage.clear();
      window.location.href = "/login";
    }, remaining);
  }
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/documentation" element={<Documentation />} />

        <Route path="/" element={<Navigate to="/app/Dashboard" replace />} />
        <Route path="/app/*" element={<Layout />} />
        <Route path="/spr/*" element={<LayoutAdmin />} />
        <Route path="*" element={<Navigate to="/app/Dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
