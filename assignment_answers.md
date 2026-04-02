# HRIS Dashboard: Complete Assignment Submission

*This document serves as my complete, end-to-end submission. Rather than just dropping code and screenshots, I want to walk you through my thought process like a story—from understanding the problem, to designing the UX, engineering the frontend, and finally returning to my own personal core beliefs.*

---

## Chapter 1: Designing the Experience (Problem 1)

When approaching the design for this HRIS Dashboard, my first thought was: **"What is the actual friction point for each persona?"** A dashboard shouldn't just be an unstructured dump of modules. It needs to be a highly opinionated "command center" that answers their most urgent questions the exact second they log in.

### 1. The HR Admin: The "Command Center"
HR operations slow down when there are bottlenecks. The HR Admin doesn't need to see their own profile; they need a macro view of the company and a micro view of urgent bottlenecks.
- **My priority:** Headcount metrics and an instant "Needs Attention" queue.
- **The Journey:** Log In ➔ HR Dashboard ➔ Immediately see "5 Pending Leaves" ➔ Click "Approve" directly on the dashboard card ➔ Return to macro metrics.
- **Design Decision:** I utilized a cool blue theme to indicate a professional, company-wide scope. Actions like running payroll or approving leaves are placed front-and-center so the Admin acts as an immediate unblocker for the rest of the company.

### 2. The Manager: Focus on "My Team"
Managers are often overwhelmed by HR software because it shows them too much irrelevant company data. A manager only cares about the 8 people reporting directly to them.
- **My priority:** "Who is working today?" and "Who needs a performance review?"
- **The Journey:** Log In ➔ Manager Dashboard ➔ Check the "Today's Availability" widget to see if anyone called in sick ➔ Click "Start Reviews" on the alert banner to handle an upcoming appraisal deadline.
- **Design Decision:** The UI is completely siloed to their direct reports. I used purple to distinguish this operational layer. The widgets focus on reducing managerial overhead, allowing them to quickly clear team leave requests and track performance without digging through a directory.

### 3. The Employee: Pure Self-Service
Employees log into HR software for highly selfish, specific reasons: *How much time off do I have left?* and *How much am I getting paid?*
- **My priority:** Big, bold leave balances and the latest payslip number.
- **The Journey:** Log In ➔ Employee Dashboard ➔ See a progress bar showing "4 days of Casual Leave remaining" ➔ Click a massive "Apply Leave" CTA next to it ➔ Submit a request.
- **Design Decision:** I used a welcoming green theme. The interface is highly personalized, stripping away all company-wide noise. By putting their next payslip and leave balances at the very top, I instantly answer the two questions that drive 90% of employee log-ins, completely removing navigational friction.

*(Note: The Figma designs for these screens mirror the high-fidelity UI of the live application provided below.)*

---

## Chapter 2: Bringing it to Life (Problem 2)

I was asked to build just *one* feature from the designs. Instead, I realized that to truly demonstrate the role-based design thinking, I needed the application to feel alive. **So, I built the entire frontend shell for all three personas.**

### The Engineering Approach
I built a frontend React Single Page Application (SPA). To achieve a modern, high-fidelity SaaS aesthetic (similar to Workday or Rippling), I utilized **Tailwind CSS v4**. 

Rather than messy inline styles, I abstracted the UI into a strict component library (`src/components/ui/`) containing reusable primitives like `Card`, `Badge`, `Button`, and `Avatar`. This ensures the codebase is highly legible, incredibly clean, and perfectly consistent across all 5 modules.

### The Featured Module: Leave Management
While the whole shell is built, the specific "Feature" I elected to make fully functional is the **Leave Management system**. 
- I utilized React's Context API (`DataContext`) as a lightweight global state manager. 
- When an Employee applies for a new leave on their dashboard, the controlled form updates the global state. 
- If you then use the Login page to switch roles to the Manager or HR Admin, that exact leave request will instantly populate in their "Needs Attention" queue, where clicking "Approve" dynamically resolves the ticket across the entire application.

### If I Had More Time
This is currently a robust frontend illusion. With 3-4 more hours, I would:
1. Connect it to a real backend (Node.js/PostgreSQL) with actual JWT authentication and Role-Based Access Control (RBAC).
2. Swap out the React Context for a more robust state management tool like **Redux Toolkit** or **Zustand** to handle complex data mutations more efficiently.
3. Add comprehensive unit testing (Jest/React Testing Library) to guarantee the approval workflow logic.
4. Heavily improve accessibility (a11y) by adding proper ARIA labels and full keyboard navigation across the complex tables and forms.

---

## Chapter 3: Who Are You Really? (Problem 3)

*Finally, switching gears from code and design to core beliefs.*

### Question 1: Something I believe strongly that most people disagree with
One belief I strongly hold, which many people around me disagree with, is that **entertainment in our younger years is just as important as work and studies.** Most people see enjoyment as a distraction or even a waste of time, but I see it as absolutely essential for long-term growth.

I believe this because constant pressure to only study or work leads directly to burnout, reduced creativity, and mental fatigue. Activities like sports, socializing, or hobbies actually improve focus, emotional stability, and problem-solving abilities in ways textbooks cannot. In my experience, the people who know how to balance both tend to perform significantly better over long timelines.

Ignoring enjoyment in the name of discipline creates imbalance—not success. Sustainable, lifelong success comes from knowing exactly when to work hard, and when to step back and recharge.

### Question 2: Something fundamentally broken in daily life and how to fix it
One thing I believe is fundamentally broken today is **how gender equality is being discussed and practiced.** Originally, gender equality meant equal opportunity, fairness, and mutual respect. However, in many modern spaces, the dialogue has shifted into promoting superiority, unrealistic expectations, or hostility between genders rather than a harmonious balance.

What’s wrong is not the core idea itself, but how it is communicated and weaponized. Social media algorithms amplify extreme, divisive opinions because anger drives engagement. This creates a distorted, combative version of equality that leads to confusion and resentment instead of mutual respect.

If I were to redesign this from scratch, I would focus on three specific interventions:
1. **The Education Layer:** Schools should teach equality through the lens of shared responsibility and fairness, entirely removing the narrative of competition between genders.
2. **The Public Discourse:** We must deliberately highlight real-life examples of collaboration and mutual respect, starving the conflict-driven narratives of oxygen.
3. **The Digital Platforms:** We must build social platforms that prioritize and reward balanced, nuanced conversations instead of artificially boosting extreme, polarizing hot-takes.

True gender equality should never feel like one side is "winning"—it should feel like both sides are progressing together.
