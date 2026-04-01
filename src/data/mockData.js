export const mockEmployees = [
  { id: "U-100", name: "Sarah Jenkins", role: "HR Admin", department: "Human Resources", joinDate: "2020-05-15", status: "Active", email: "sarah.j@company.com" },
  { id: "U-205", name: "Michael Chen", role: "Engineering Manager", department: "Engineering", joinDate: "2019-11-01", status: "Active", email: "michael.c@company.com" },
  { id: "U-412", name: "Alex Robinson", role: "Software Engineer", department: "Engineering", joinDate: "2022-03-10", status: "Active", email: "alex.r@company.com" },
  { id: "U-413", name: "Jessica Wong", role: "Product Designer", department: "Design", joinDate: "2022-08-22", status: "Active", email: "jessica.w@company.com" },
  { id: "U-414", name: "David Kim", role: "QA Engineer", department: "Engineering", joinDate: "2023-01-15", status: "On Leave", email: "david.k@company.com" },
];

export const mockLeaveRequests = [
  { id: "LR-1001", employeeId: "U-412", employeeName: "Alex Robinson", type: "Sick Leave", startDate: "2024-05-10", endDate: "2024-05-11", status: "Pending", appliedOn: "2024-05-08" },
  { id: "LR-1002", employeeId: "U-414", employeeName: "David Kim", type: "Annual Leave", startDate: "2024-06-01", endDate: "2024-06-15", status: "Approved", appliedOn: "2024-04-20" },
  { id: "LR-1003", employeeId: "U-413", employeeName: "Jessica Wong", type: "Casual Leave", startDate: "2024-05-15", endDate: "2024-05-15", status: "Pending", appliedOn: "2024-05-09" },
];

export const mockPayrollHistory = [
  { id: "PAY-0424", month: "April 2024", date: "2024-04-30", base: 8500, bonus: 500, deductions: 1200, net: 7800, status: "Paid" },
  { id: "PAY-0324", month: "March 2024", date: "2024-03-31", base: 8500, bonus: 0, deductions: 1200, net: 7300, status: "Paid" },
  { id: "PAY-0224", month: "February 2024", date: "2024-02-29", base: 8500, bonus: 1000, deductions: 1200, net: 8300, status: "Paid" },
];

export const mockPerformanceReviews = [
  { id: "PR-2023-H2", employeeId: "U-412", period: "H2 2023", managerRating: 4.5, selfRating: 4.0, status: "Completed", deadline: "2024-01-15" },
  { id: "PR-2024-H1", employeeId: "U-412", period: "H1 2024", managerRating: null, selfRating: null, status: "Pending Self-Appraisal", deadline: "2024-06-30" },
];

export const mockJobs = [
  { id: "JOB-001", title: "Senior Frontend Engineer", department: "Engineering", type: "Full-time", location: "Remote", applicants: 45, status: "Open", postedOn: "2024-04-01" },
  { id: "JOB-002", title: "Product Marketing Manager", department: "Marketing", type: "Full-time", location: "New York", applicants: 12, status: "Open", postedOn: "2024-05-01" },
  { id: "JOB-003", title: "Customer Success Rep", department: "Support", type: "Contract", location: "Austin", applicants: 89, status: "Closed", postedOn: "2024-02-15" },
];

export const mockHeadcountStats = {
  total: 485,
  newJoiners: 12,
  attrition: 3,
  openPositions: 8,
};
