import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';
import { Target, MessageSquare } from 'lucide-react';
import { mockPerformanceReviews } from '../data/mockData';

export default function PerformanceReviews() {
  const { role, user } = useAuth();
  
  const isManager = role === 'MANAGER';
  // If Manager, show team's reviews (using mock filter) or own? Both ideally, let's just show own and a simple manager view toggle here
  const myReviews = mockPerformanceReviews.filter(r => r.employeeId === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Performance Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">Track your goals and completed appraisals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Active Review Cycle */}
          <Card className="border-orange-200 shadow-sm border-t-4 border-t-orange-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="bg-orange-100 text-orange-800 mb-2">Active Cycle</Badge>
                  <CardTitle className="text-xl">H1 2024 Appraisal</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Deadline</p>
                  <p className="text-sm font-semibold text-orange-600">June 30, 2024</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Completion Status</span>
                  <span className="text-gray-500">20%</span>
                </div>
                <ProgressBar value={20} max={100} variant="warning" height="h-3" />
              </div>
              
              <div className="bg-orange-50 p-4 rounded-md flex items-start gap-4">
                <Target className="text-orange-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">Self-Appraisal Required</h4>
                  <p className="text-sm text-gray-600 mt-1">Please complete your self-evaluation form before the deadline. Your manager will then review and schedule a 1:1.</p>
                </div>
                <Button>Start Form</Button>
              </div>
            </CardContent>
          </Card>

          {/* Past Reviews */}
          <h3 className="text-lg font-semibold text-gray-900 pt-4 border-b border-gray-200 pb-2">Past Appraisals</h3>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {myReviews.filter(r => r.status === 'Completed').map(review => (
                  <div key={review.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-50 text-green-600 rounded-full">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{review.period} Annual Review</h4>
                        <p className="text-sm text-gray-500 mt-1">Completed {review.deadline}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Self Rating</p>
                        <p className="text-xl font-bold text-gray-900">{review.selfRating}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Manager Rating</p>
                        <p className="text-xl font-bold text-blue-600">{review.managerRating}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">View Feedback</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg">My Goals (H1 2024)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">Ship Dashboard V2</span>
                  <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded cursor-default border border-green-200">On Track</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">Release the new React-based fully functioning dashboard.</p>
                <ProgressBar value={80} max={100} variant="success" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-900">Reduce App Boot Time</span>
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded cursor-default border border-yellow-200">At Risk</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">Decrease initial load time below 1s.</p>
                <ProgressBar value={40} max={100} variant="warning" />
              </div>
              
              <Button variant="outline" className="w-full mt-2" size="sm">Manage Goals</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
