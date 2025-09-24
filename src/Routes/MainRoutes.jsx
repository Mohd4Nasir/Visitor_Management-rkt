import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';
import Mainlayout from '../Components/Layout/Mainlayout';
import Visitors from '../pages/Visitors/Visitors';
import CreatePass from '../pages/CreatePAss/CreatePass';
import HostListCards from '../pages/Host/HostList';
import Hostfrom from '../pages/Host/HostAddform';
import EditHost from '../pages/Host/editUser';

// 🔒 PrivateRoute wrapper
function PrivateRoute() {
  const isAuthenticated = localStorage.getItem('authToken'); // 👈 adjust this to your auth logic
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Mainlayout />}>
            {/* Default: redirect to dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="create-pass" element={<CreatePass />} />
            <Route path="hosts" element={<HostListCards />} />
            <Route path="edit-host/:id" element={<EditHost />} />
            <Route path="create-host" element={<Hostfrom />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRoutes;
