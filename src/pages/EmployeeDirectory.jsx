import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { mockEmployees } from '../data/mockData';

export default function EmployeeDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Employee Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Find and connect with colleagues across the company.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, role, department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar fallback={employee.name[0]} size="lg" className="border-2 border-white shadow-sm" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{employee.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{employee.role}</p>
                  </div>
                </div>
                <Badge variant={employee.status === 'Active' ? 'success' : 'warning'}>
                  {employee.status}
                </Badge>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <a href={`mailto:${employee.email}`} className="hover:text-blue-600 hover:underline">{employee.email}</a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  {employee.department} Department
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredEmployees.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No employees found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
