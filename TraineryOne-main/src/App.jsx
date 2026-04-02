import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardSwitcher from "./pages/DashboardSwitcher";
import LeaveManagement from "./pages/LeaveManagement";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import Payroll from "./pages/Payroll";
import PerformanceReviews from "./pages/PerformanceReviews";
import Recruitment from "./pages/Recruitment";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardSwitcher />} />
              <Route path="leaves" element={<LeaveManagement />} />
              <Route path="directory" element={<EmployeeDirectory />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="performance" element={<PerformanceReviews />} />
              <Route path="recruitment" element={<Recruitment />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
