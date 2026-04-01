import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, UserCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">TraineryHR</h2>
          <p className="mt-2 text-sm text-gray-600">Select a role to continue</p>
        </div>

        <div className="space-y-4">
          <Card className="hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => handleLogin('HR_ADMIN')}>
            <CardContent className="flex items-center p-6 space-x-4 pt-6">
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">HR Admin</h3>
                <p className="text-sm text-gray-500">Manage payroll, headcount & hiring</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => handleLogin('MANAGER')}>
            <CardContent className="flex items-center p-6 space-x-4 pt-6">
              <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">Manager</h3>
                <p className="text-sm text-gray-500">Approve leaves & team performance</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-green-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => handleLogin('EMPLOYEE')}>
            <CardContent className="flex items-center p-6 space-x-4 pt-6">
              <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                <UserCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">Employee</h3>
                <p className="text-sm text-gray-500">Apply leaves & view payslips</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
