import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">

      <aside className="w-72 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav className="space-y-4">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded text-xl">
            Admin Management
          </Link>
        </nav>
      </aside>

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-center">ADMIN DASHBOARD</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
