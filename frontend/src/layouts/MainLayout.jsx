// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar always visible on these routes */}
      <Sidebar />

      {/* Main content area (shifted right by sidebar width) */}
      <main className="ml-56 flex-1 bg-[#020617] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
