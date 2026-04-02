import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Plus, Users, Briefcase, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockJobs } from '../data/mockData';

export default function Recruitment() {
  const { role } = useAuth();
  const isAdminOrManager = role === 'HR_ADMIN' || role === 'MANAGER';

  if (!isAdminOrManager) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Briefcase className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Internal Job Board</h2>
        <p className="mt-2 text-gray-500 max-w-md">Browse open positions across the company and apply internally. This feature is coming soon to the employee dashboard.</p>
        <Button className="mt-6">Refer a Friend</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Recruitment Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">Manage open positions and track applicants.</p>
        </div>
        <Button><Plus size={16} className="mr-2"/> Post New Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Roles</p>
              <h3 className="text-xl font-bold text-gray-900 leading-none mt-1">
                {mockJobs.filter(j => j.status === 'Open').length}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Applicants</p>
              <h3 className="text-xl font-bold text-gray-900 leading-none mt-1">
                {mockJobs.reduce((sum, job) => sum + job.applicants, 0)}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium text-gray-900">
                    {job.title}
                    <div className="text-xs text-gray-500 mt-0.5">{job.type} • Posted {job.postedOn}</div>
                  </TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-1 text-gray-400" />
                      {job.location}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="primary" className="font-mono">{job.applicants}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'Open' ? 'success' : 'default'}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    <Button size="sm">View Candidates</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
