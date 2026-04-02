import React, { createContext, useContext, useState } from 'react';
import { mockLeaveRequests, mockEmployees, mockJobs, mockPerformanceReviews, mockPayrollHistory, mockHeadcountStats } from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  // Global state for Leaves
  const [leaves, setLeaves] = useState(mockLeaveRequests);
  const [employees] = useState(mockEmployees);
  const [jobs] = useState(mockJobs);
  const [reviews] = useState(mockPerformanceReviews);
  const [payroll] = useState(mockPayrollHistory);
  const [headcount] = useState(mockHeadcountStats);

  // Actions for leaves
  const addLeave = (newLeave) => {
    setLeaves([newLeave, ...leaves]);
  };

  const updateLeaveStatus = (id, newStatus) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  return (
    <DataContext.Provider value={{
      leaves, addLeave, updateLeaveStatus,
      employees, jobs, reviews, payroll, headcount
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
