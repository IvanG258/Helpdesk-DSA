import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./screens/start/Home";
import Servicos from "./screens/servicos/Servicos";
import Contacto from "./screens/contacto.jsx/Contacto";
import Layout from "./layout/LayoutAdmin";
import Reporte from "./screens/reports/Reporte";
import SinglePage from "./screens/SiglePage";
function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SinglePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
