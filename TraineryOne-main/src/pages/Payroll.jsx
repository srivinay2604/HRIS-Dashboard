import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Download, UploadCloud, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockPayrollHistory } from '../data/mockData';

export default function Payroll() {
  const { role } = useAuth();
  const isAdmin = role === 'HR_ADMIN';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payroll</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isAdmin ? "Manage company payroll runs and history." : "View your payslips and tax documents."}
          </p>
        </div>
        {isAdmin && (
          <Button><UploadCloud size={16} className="mr-2"/> Run New Payroll</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{isAdmin ? "Recent Payroll Runs" : "Payslip History"}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Run Date</TableHead>
                  <TableHead>Gross</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayrollHistory.map((pay) => (
                  <TableRow key={pay.id}>
                    <TableCell className="font-medium text-gray-900">{pay.month}</TableCell>
                    <TableCell className="text-gray-500">{pay.date}</TableCell>
                    <TableCell>${(pay.base + pay.bonus).toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-gray-900">${pay.net.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="success">Paid</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Download size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sidebar Payroll Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg">Tax Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex border border-gray-200 rounded-md p-3 items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-sm text-gray-900">Form W-2 (2023)</p>
                  <p className="text-xs text-gray-500">Issued Jan 31, 2024</p>
                </div>
                <Download size={16} className="text-gray-400" />
              </div>
              <div className="flex border border-gray-200 rounded-md p-3 items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div>
                  <p className="font-medium text-sm text-gray-900">Form W-2 (2022)</p>
                  <p className="text-xs text-gray-500">Issued Jan 31, 2023</p>
                </div>
                <Download size={16} className="text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none">
            <CardContent className="p-6">
              <div className="p-3 bg-white/20 w-fit rounded-lg mb-4">
                <DollarSign size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Direct Deposit</h3>
              <p className="text-blue-100 text-sm mb-4">Your pay is deposited to ending in •••• 4092</p>
              <Button variant="outline" className="w-full border-blue-400 text-blue-100 hover:bg-white/10 hover:text-white border border-white hover:border-transparent">Update Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
