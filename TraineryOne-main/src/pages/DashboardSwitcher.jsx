import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import HRAdminDashboard from './dashboards/HRAdminDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';

export default function DashboardSwitcher() {
  const { role } = useAuth();
  
  if (role === 'HR_ADMIN') return <HRAdminDashboard />;
  if (role === 'MANAGER') return <ManagerDashboard />;
  if (role === 'EMPLOYEE') return <EmployeeDashboard />;
  
  return null;
}
