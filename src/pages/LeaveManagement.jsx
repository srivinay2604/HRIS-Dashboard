import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Calendar, Plus } from 'lucide-react';

export default function LeaveManagement() {
  const { role, user } = useAuth();
  const { leaves, addLeave, updateLeaveStatus } = useData();
  const [showApplyMode, setShowApplyMode] = useState(false);
  
  // Form State
  const [type, setType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filtering
  let displayedLeaves = leaves;
  if (role === 'EMPLOYEE') {
    displayedLeaves = leaves.filter(l => l.employeeId === user?.id);
  }

  const handleSubmit = () => {
    if (!startDate || !endDate) return;
    addLeave({
      id: `LR-${Math.floor(Math.random() * 10000)}`,
      employeeId: user?.id,
      employeeName: user?.name,
      type,
      startDate,
      endDate,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0]
    });
    setShowApplyMode(false);
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leave Management</h1>
          <p className="text-sm text-gray-500 mt-1">Apply for leave and manage requests.</p>
        </div>
        {role === 'EMPLOYEE' && (
          <Button onClick={() => setShowApplyMode(!showApplyMode)}>
            {showApplyMode ? 'View History' : <><Plus size={16} className="mr-2"/> Apply Leave</>}
          </Button>
        )}
      </div>

      {showApplyMode ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>New Leave Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 bg-white border">
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Unpaid Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border bg-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border bg-white placeholder-gray-400" placeholder="Briefly describe the reason for leave..."></textarea>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowApplyMode(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!startDate || !endDate}>Submit Request</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {(role === 'HR_ADMIN' || role === 'MANAGER') && <TableHead>Employee</TableHead>}
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  {(role === 'HR_ADMIN' || role === 'MANAGER') && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedLeaves.map((leave) => (
                  <TableRow key={leave.id}>
                    {(role === 'HR_ADMIN' || role === 'MANAGER') && (
                      <TableCell className="font-medium">{leave.employeeName}</TableCell>
                    )}
                    <TableCell>{leave.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar size={14} className="mr-1.5 text-gray-400"/>
                        {leave.startDate} to {leave.endDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{leave.appliedOn}</TableCell>
                    <TableCell>
                      <Badge variant={leave.status === 'Approved' ? 'success' : leave.status === 'Pending' ? 'warning' : 'danger'}>
                        {leave.status}
                      </Badge>
                    </TableCell>
                    {(role === 'HR_ADMIN' || role === 'MANAGER') && (
                      <TableCell className="text-right">
                        {leave.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => updateLeaveStatus(leave.id, 'Rejected')}>Reject</Button>
                            <Button size="sm" onClick={() => updateLeaveStatus(leave.id, 'Approved')}>Approve</Button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Resolved</span>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {displayedLeaves.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                      No leave records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
