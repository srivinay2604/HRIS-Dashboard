# HRIS Dashboard Assignment Answers

## Problem 1: UX Design — HRIS Dashboard

*(Note: Since you need Figma screens, the fastest way is to take screenshots of the 3 dashboards we built in the React app, then paste them into Figma. They are already high-fidelity and designed well.)*

### User Journey Flows
*(You can recreate these simple boxes/arrows in Figma, or use this structure)*

**1. HR Admin Flow**
`Login` ➔ `HR Admin Dashboard` ➔ `Review Pending Leaves (Attention Required)` ➔ `Approve/Reject Modal` ➔ `Return to Dashboard`
- *Goal*: Quickly clear administrative bottlenecks (leaves/payroll).
- *Action*: 1-click approvals right from the dashboard landing.

**2. Manager Flow**
`Login` ➔ `Manager Dashboard` ➔ `View "Today's Availability" widget` ➔ `Click "Start Reviews" for upcoming deadlines` ➔ `Performance Review Form`
- *Goal*: Know who is working today and handle team performance.
- *Action*: Instant visibility into team attendance and 1-click to start overdue appraisals.

**3. Employee Flow**
`Login` ➔ `Employee Dashboard` ➔ `Check Leave Balance` ➔ `Click "Apply Leave"` ➔ `Leave Request Form` ➔ `Leave History/Status view`
- *Goal*: Perform self-service tasks like requesting time off or checking pay.
- *Action*: Big primary button to apply for leave directly next to their balances.

### Design Decisions Note
**HR Admin:** Designed as a "command center" emphasizing aggregate metrics (Headcount, Alerts) and a high-priority "Needs Attention" queue so HR can unblock company operations instantly.
**Manager:** Shifted focus entirely to "My Team." The interface prioritizes current team availability and urgent team-specific action items (leave approvals, appraisals) to reduce managerial overhead.
**Employee:** Created a personalized, purely self-service interface. By putting their leave balances and next payslip front-and-center, we immediately answer the two most common questions employees log in to check.

---

## Problem 2: Build It

### Approach & Future Improvements Note
**Approach:** For the specific feature, I built a fully functional **Leave Management** system utilizing a global React Context API (`DataContext`). Employees can submit new leave requests via a controlled form, which updates the global state. Managers and HR Admins instantly see these requests in their respective dashboard queues and can approve or reject them, reflecting the status change across the entire application instantly. I used Tailwind CSS v4 to achieve a modern, high-fidelity SaaS aesthetic (similar to Workday/Rippling) with reusable UI primitives to ensure clean, readable code.

**What I'd do better with more time:**
1. Connect to a real backend (Node.js/PostgreSQL) with actual JWT authentication and Role-Based Access Control (RBAC) instead of mock data.
2. Implement a robust state management tool like Redux Toolkit or Zustand to handle complex data mutations across all modules instead of React Context.
3. Add comprehensive unit testing (Jest/React Testing Library) and E2E tests (Cypress) to ensure the approval workflows function flawlessly.
4. Improve accessibility (a11y) by adding proper ARIA labels and full keyboard navigation across all complex tables and forms.
