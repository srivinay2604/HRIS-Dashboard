import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Calendar, Wallet, CheckSquare, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { leaves, payroll, reviews } = useData();
  
  const myLeaves = leaves.filter(l => l.employeeId === user?.id);
  const myPayroll = payroll[0]; // latest
  const myReview = reviews.find(r => r.employeeId === user?.id && r.status.includes('Pending'));

  // Mock allowance balance
  const casualLeaveUsed = 4;
  const casualLeaveTotal = 12;
  const sickLeaveUsed = 2;
  const sickLeaveTotal = 10;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-sm text-gray-500 mt-1">Here is the latest applied to your profile.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/leaves')}>Apply Leave</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Leave Balances */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Calendar className="text-green-600 mr-2" size={20}/>
              <h3 className="font-semibold text-gray-900">Leave Balance</h3>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Casual Leave</span>
                  <span className="font-medium text-gray-900">{casualLeaveTotal - casualLeaveUsed} left</span>
                </div>
                <ProgressBar value={casualLeaveUsed} max={casualLeaveTotal} variant="success" />
                <p className="text-xs text-gray-400 mt-1">{casualLeaveUsed} of {casualLeaveTotal} days used</p>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Sick Leave</span>
                  <span className="font-medium text-gray-900">{sickLeaveTotal - sickLeaveUsed} left</span>
                </div>
                <ProgressBar value={sickLeaveUsed} max={sickLeaveTotal} variant="warning" />
                <p className="text-xs text-gray-400 mt-1">{sickLeaveUsed} of {sickLeaveTotal} days used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latest Payslip */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Last Payslip</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">${myPayroll?.net.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Wallet size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500 cursor-pointer hover:underline text-green-600 font-medium" onClick={() => navigate('/payroll')}>
                View breakdown
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">Profile</p>
              <span className="text-xs font-bold text-gray-900">85%</span>
            </div>
            <ProgressBar value={85} max={100} variant="primary" />
            <div className="mt-4 flex items-center text-sm text-gray-500 cursor-pointer hover:text-green-600 transition-colors">
              Update details
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>Actions requiring your attention</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-gray-100">
              {myReview && (
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                      <Target size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Self-Appraisal Due</p>
                      <p className="text-xs text-gray-500">{myReview.period} • Deadline: {myReview.deadline}</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => navigate('/performance')}>Start Form</Button>
                </div>
              )}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                    <CheckSquare size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Acknowledge IT Policy</p>
                    <p className="text-xs text-gray-500">Required annual compliance</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leave History Short */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Recent Leave Requests</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leaves')}>View All</Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-gray-100">
              {myLeaves.map((leave) => (
                <div key={leave.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{leave.type}</p>
                    <p className="text-xs text-gray-500">{leave.startDate} to {leave.endDate}</p>
                  </div>
                  <Badge variant={leave.status === 'Approved' ? 'success' : leave.status === 'Pending' ? 'warning' : 'danger'}>
                    {leave.status}
                  </Badge>
                </div>
              ))}
              {myLeaves.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">No recent leave requests</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
