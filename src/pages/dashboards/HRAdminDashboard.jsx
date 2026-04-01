import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Users, FileText, CheckCircle, AlertTriangle, UserPlus, Clock, Briefcase } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

export default function HRAdminDashboard() {
  const navigate = useNavigate();
  const { headcount, leaves, updateLeaveStatus, jobs } = useData();
  
  const pendingLeaves = leaves.filter(l => l.status === "Pending");
  const openJobs = jobs.filter(j => j.status === "Open");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what is happening across the company today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/directory')}>Company Directory</Button>
          <Button onClick={() => navigate('/payroll')}>Run Payroll</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Headcount</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{headcount.total}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+{headcount.newJoiners}</span>
              <span className="text-gray-500 ml-2">new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Leaves</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingLeaves.length}</h3>
              </div>
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                <Clock size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">Require approval</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Positions</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{openJobs.length}</h3>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              Across {new Set(openJobs.map(j => j.department)).size} departments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Next Payroll</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">May 31</h3>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <FileText size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <AlertTriangle size={14} className="text-yellow-500 mr-1"/>
              <span>2 actions required</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Needs Attention</CardTitle>
              <CardDescription>Leaves waiting for HR clearance</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leaves')}>View All</Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-gray-100">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={leave.employeeName[0]} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{leave.employeeName}</p>
                      <p className="text-xs text-gray-500">{leave.type} • {leave.startDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateLeaveStatus(leave.id, 'Rejected')}>Reject</Button>
                    <Button size="sm" onClick={() => updateLeaveStatus(leave.id, 'Approved')}>Approve</Button>
                  </div>
                </div>
              ))}
              {pendingLeaves.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">No pending approvals</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Active Recruitment */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Active Recruitment</CardTitle>
              <CardDescription>Open roles currently hiring</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/recruitment')}>Manage</Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-gray-100">
              {openJobs.map((job) => (
                <div key={job.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.department} • {job.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{job.applicants}</p>
                    <p className="text-xs text-gray-500">Applicants</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
