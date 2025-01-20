import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import UserTable from "./components/UserTable";

const App: React.FC = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<UserTable />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
