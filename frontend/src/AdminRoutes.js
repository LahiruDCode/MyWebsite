import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Admin Pages - Only keeping Login
import Login from './pages/admin/Login';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default AdminRoutes;
