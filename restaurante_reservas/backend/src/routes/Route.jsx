import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import TelaPrincipal from "../pages/TelaPrincipal";
import Reservas from "../pages/Reservas";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/telaPrincipal"
          element={
            <PrivateRoute>
              <TelaPrincipal />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <Reservas />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
