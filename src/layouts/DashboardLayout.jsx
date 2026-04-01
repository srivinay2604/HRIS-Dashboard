import React, { useState } from 'react';
import { Outlet, Navigate, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  CreditCard, 
  Target, 
  Briefcase,
  Bell,
  LogOut,
  Search,
  Check
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { cn } from '../lib/utils';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leaves', label: 'Leave Management', icon: Calendar },
  { path: '/directory', label: 'Employee Directory', icon: Users },
  { path: '/payroll', label: 'Payroll', icon: CreditCard },
  { path: '/performance', label: 'Performance', icon: Target },
  { path: '/recruitment', label: 'Recruitment', icon: Briefcase },
];

const mockNotifications = [
  { id: 1, text: "Leave approved for May 10", time: "2h ago", read: false },
  { id: 2, text: "Payroll processed for April", time: "1d ago", read: true },
  { id: 3, text: "New applicant for Frontend role", time: "2d ago", read: true },
];

export default function DashboardLayout() {
  const { role, user, logout } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Get role specific styling for the active state
  const getActiveClassName = () => {
    if (role === 'HR_ADMIN') return 'bg-blue-50 text-blue-700';
    if (role === 'MANAGER') return 'bg-purple-50 text-purple-700';
    return 'bg-green-50 text-green-700';
  };

  const getRoleBadgeVariant = () => {
    if (role === 'HR_ADMIN') return 'primary';
    if (role === 'MANAGER') return 'manager';
    return 'success';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar navigation */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Briefcase className="w-6 h-6 mr-2 text-gray-900" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">TraineryHR</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
              
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? getActiveClassName() 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "" : "text-gray-400")} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main layout wrapper */}
      <div className="flex-1 flex flex-col items-stretch overflow-hidden relative">
        {/* Top navbar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white flex-shrink-0 z-10">
          <div className="flex-1 flex">
            {/* Search bar logic structure */}
            <div className="max-w-md w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              />
            </div>
          </div>
          
          <div className="ml-4 flex items-center space-x-6 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
            >
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              <Bell className="h-6 w-6" />
            </button>
            
            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <Card className="absolute top-10 right-32 w-80 shadow-xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 test-sm">Notifications</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-800">Mark all read</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map(notification => (
                    <div key={notification.id} className={cn("px-4 py-3 hover:bg-gray-50 flex items-start gap-3 border-b border-gray-50 last:border-0", !notification.read && "bg-blue-50/50")}>
                      <div className="mt-0.5">
                        <div className={cn("w-2 h-2 rounded-full", !notification.read ? "bg-blue-600" : "bg-transparent")} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right flex flex-col justify-center">
                <span className="text-sm font-medium text-gray-900 leading-none mb-1">{user?.name}</span>
                <Badge variant={getRoleBadgeVariant()} className="text-[10px] leading-none px-1.5 py-0.5 w-fit ml-auto">
                  {user?.role}
                </Badge>
              </div>
              <Avatar fallback={user?.name?.[0]} size="md" />
            </div>
          </div>
        </header>

        {/* Dynamic Page content wrapper with animation transition */}
        <main className="flex-1 overflow-y-auto bg-gray-50 h-full p-8 relative">
          <div key={location.pathname} className="max-w-7xl mx-auto h-full animate-in fade-in slide-in-from-bottom-2 duration-300 ease-in-out">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
