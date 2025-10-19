import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../../src/pages/Login";
import Cadastro from "../../../src/pages/Cadastro";
import TelaPrincipal from "../../../src/pages/TelaPrincipal";
import Reservas from "../../../src/pages/Reservas";
import Pendentes from "../../../src/pages/Pendentes";

import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/cadastro"
          element={
            <PrivateRoute>
              <Cadastro />
            </PrivateRoute>
          }
        />

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

        <Route
          path="/pendentes"
          element={
            <PrivateRoute>
              <Pendentes />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
