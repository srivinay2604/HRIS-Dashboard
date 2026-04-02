# HRIS Dashboard Assignment

A high-fidelity, completely custom frontend HRIS Dashboard designed and built for a mid-sized company.

## 🚀 How to Run Locally

You will need [Node.js](https://nodejs.org/) installed on your machine.

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

---

## 🎨 Features & Architecture

This application was built primarily focusing on **clean frontend architecture, modern component design, and seamless user experience.** 

### 1. Role-Based Views
The authentication logic is mocked via a global React Context (`AuthContext`). Selecting a persona on the Login screen completely morphs the app's routing, layout priorities, and color-theming.
- **HR Admin (Blue Theme)**: Prioritizes company-wide aggregate metrics and pending bottlenecks.
- **Manager (Purple Theme)**: Prioritizes "My Team" statistics, current availability, and team performance blocks.
- **Employee (Green Theme)**: A strictly self-service view focused on immediately accessing leave balances and recent payslips.

### 2. Functional "Build It" Feature: Leave Management
As requested to "Pick any ONE feature to build", the **Leave Management** module was wired as a fully interactive, stateful feature across the app using a global `DataContext`.
- **The Workflow**: An Employee can log in and apply for a leave on the Leave Management page. If you then log out and log back in as an HR Admin or Manager, that specific leave request will immediately appear in your "Needs Attention" queue, where you can Approve or Reject it!

### 3. Core Modules Included
- **Leave Management**
- **Employee Directory**
- **Payroll**
- **Performance Reviews**
- **Recruitment**

## 🛠 Tech Stack
- **React 18** (Functional components & hooks)
- **Vite** (Build tooling)
- **Tailwind CSS v4** (Utility-first styling, CSS custom properties)
- **Lucide React** (Crisp iconography)
- **React Router DOM** (Client-side routing)

*(For full design motivations and the written essays for Problem 1 and Problem 3, please review the `assignment_answers.md` file included in this directory!)*
