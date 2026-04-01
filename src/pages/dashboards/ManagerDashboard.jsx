import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Users, Clock, Target, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { leaves, updateLeaveStatus, employees, reviews, jobs } = useData();
  
  // Mock filter for team specific
  const teamMembers = employees.filter(e => e.department === user?.department && e.id !== user?.id);
  const teamLeaves = leaves.filter(l => teamMembers.some(tm => tm.id === l.employeeId) && l.status === "Pending");
  const upcomingReviews = reviews.filter(r => teamMembers.some(tm => tm.id === r.employeeId) && r.managerRating === null);
  const teamJobs = jobs.filter(j => j.department === user?.department && j.status === 'Open');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manager Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your team's leaves, performance, and hiring.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/directory')}>Team Directory</Button>
          <Button onClick={() => navigate('/performance')}>Start Reviews</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">My Team</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{teamMembers.length}</h3>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1">
              {teamMembers.slice(0, 5).map(member => (
                <Avatar key={member.id} fallback={member.name[0]} size="sm" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Leaves</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{teamLeaves.length}</h3>
              </div>
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                <Clock size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-purple-600 font-medium cursor-pointer hover:underline" onClick={() => navigate('/leaves')}>View requests</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Upcoming Reviews</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{upcomingReviews.length}</h3>
              </div>
              <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                <Target size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              Due in next 14 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Roles</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{teamJobs.length}</h3>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              In {user?.department}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Leave Requests */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Leave Approvals</CardTitle>
              <CardDescription>Recent requests from your team</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leaves')}>View All</Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-gray-100">
              {teamLeaves.map((leave) => (
                <div key={leave.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={leave.employeeName[0]} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{leave.employeeName}</p>
                      <p className="text-xs text-gray-500">{leave.type} • {leave.startDate} to {leave.endDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-auto">
                    <Button variant="outline" size="sm" onClick={() => updateLeaveStatus(leave.id, 'Rejected')}>Reject</Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => updateLeaveStatus(leave.id, 'Approved')}>Approve</Button>
                  </div>
                </div>
              ))}
              {teamLeaves.length === 0 && (
                <div className="p-8 text-center text-gray-500 text-sm">No pending leave requests</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team Attendance Overview */}
        <Card className="flex flex-col h-full">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle>Today's Availability</CardTitle>
            <CardDescription>Who's working and who's away</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={member.name[0]} size="sm"/>
                    <span className="text-sm font-medium text-gray-900">{member.name}</span>
                  </div>
                  <Badge variant={member.status === "Active" ? "success" : "danger"}>
                    {member.status === "Active" ? "Working" : "On Leave"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
