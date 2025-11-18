import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./screens/dashboard/Dashboard";
import Clientes from "./screens/gym/Clientes";
import Configuracoes from "./screens/configuracoes/Configuracoes";
import PublicLayout from "./layout/PublicLayout";
import Login from "./screens/login/Login";
import Unauthorized from "./screens/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reporte from "./screens/reporte/Reporte";
import Reportes from "./screens/reporte/Reportes";
import Usuarios from "./screens/dashboard/Usuarios";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* --- Rotas públicas --- */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
          </Route>

          {/* --- Página de acesso negado --- */}
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* --- Rotas protegidas --- */}

          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="reporte" element={<Reporte />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>

        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
