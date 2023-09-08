import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { API_BASE_URL, fetchUsers } from "./services/api";
import axios from "axios";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import User from "./pages/User";
import Product from "./pages/Product";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/products" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
