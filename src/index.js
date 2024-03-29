import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import AdminApp from "./AdminApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartPovider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
