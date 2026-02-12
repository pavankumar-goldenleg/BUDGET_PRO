# BudgetPro – Personal Expense Tracker & Budget Planner

## Team Details
- **Team Name:** Astro Hackers 
- **Members:** M. Pavan Kumar, M. Geethachand, S. Sai sadhvik, K. Mourya

---

## Problem Statement
Students and young professionals living away from home often struggle with managing their finances effectively. Daily expenses, monthly budgets, and unexpected costs make it difficult to save money or plan ahead.  

Manual tracking through spreadsheets or notebooks is error-prone, time-consuming, and lacks actionable insights. There is a clear need for a digital tool that simplifies expense management while providing meaningful feedback to help users stay financially responsible.  

---

## Our Solution
**BudgetPro** is a smart, AI-enhanced personal finance app designed to help users track, analyze, and optimize their expenses. By providing detailed insights, customizable budgets, and interactive visualizations, BudgetPro empowers users to make informed financial decisions.  

### Why BudgetPro is Useful
- **Prevent Overspending:** Real-time alerts when expenses approach budget limits, with optional low-balance stop notifications.  
- **Track All Expenses:** Log transactions in ₹ with category, date, description, and optional tags.  
- **Visualize Spending:** Pie charts, bar graphs, line graphs, and heatmaps show spending patterns.  
- **Income & Savings Management:** Track multiple income sources and net savings (Income − Expenses).  
- **Plan for the Future:** Set savings goals, track progress, and receive AI-driven suggestions.  

---

## Tech Stack
**BudgetPro** is built with modern, reliable, and scalable technologies:

- **Frontend:**  
  - HTML5, CSS3, TailwindCSS for responsive and clean design  
  - JavaScript (Vanilla JS) for interactivity and dynamic updates  
  - Chart.js for analytics and visualizations  

- **Backend:**  
  - Node.js with Express (or Python Flask if used) for CRUD operations and expense calculations  

- **Database / Storage:**  
  - Local JSON / SQLite for offline data persistence  
  - Optional cloud sync with Firebase / Supabase  

- **Libraries & Tools:**  
  - Moment.js / Day.js for date calculations  
  - PDF/CSV export libraries for reports  
  - OCR for receipt uploads (optional)  

- **Security & Integration:**  
  - App-level password/PIN  
  - Encrypted cloud backups  
  - Optional bank account / UPI integration  

---

## Core Features

| Feature | Description |
|---------|-------------|
| 💰 **Expense Logging** | Record amount (₹), category, date, description, and optional tags. |
| 📊 **Category Breakdown** | Main categories (Food, Transport, Shopping, Utilities, Entertainment) and subcategories (e.g., Groceries, Eating Out, Coffee). |
| 🎯 **Budgets** | Weekly, monthly, or yearly budgets per category, adjustable on the fly with leftover carryover. |
| 📈 **Spending Visualization** | Pie charts, bar charts, line graphs, and heatmaps for daily/weekly/monthly trends. |
| ⚠️ **Budget Alerts** | Notifications when approaching or exceeding budgets; optionally stop further spending. |
| 📅 **Monthly Reports** | Summaries of expenses, remaining budgets, and net savings. |
| 💳 **Income Tracking** | Track multiple income sources and visualize savings growth over time. |
| 🔍 **Search & Filter** | Find expenses by text, category, amount range, date range, or tags. |
| 📝 **Notes & Tags** | Add context to expenses for easier tracking. |
| 🔄 **Recurring Transactions** | Daily, weekly, or monthly recurring expenses added automatically. |
| 💾 **Export & Import** | Export reports to CSV, PDF, or Excel; import past records from CSV. |
| 🌐 **Multi-Currency & Localization** | Automatic conversion, date/time formatting, and currency support. |
| 📸 **Receipt Upload & OCR** | Upload receipts and extract transaction details automatically. |
| 🎯 **Savings Goals** | Set goals (e.g., “Save ₹5000 for trip”) and track progress visually. |
| 🏆 **Gamification** | Badges, streaks, and motivational rewards for consistent tracking. |
| 🔐 **Security** | App-level password/PIN and encrypted cloud backups. |
| 🏦 **Integration** | Optional bank account / UPI integration for automatic transaction fetching. |

---

## UX/UI Enhancements
- **Dashboard:** Quick overview of total spending, remaining budgets, and net savings.  
- **Quick Add Expense:** Add new expenses with a single click.  
- **Interactive Visualizations:** Drill down into categories and view trends over time.  
- **Theme Customization:** Dark/light mode toggle and customizable category colors.  
- **Enhanced Search & Filter:** Sort by largest expense, most frequent category, or date range.  

---

## Technical Highlights
- **Offline-First Design:** Works without internet; syncs when online.  
- **Persistent Data Storage:** Local JSON/SQLite storage with optional cloud sync.  
- **Budget vs Actual Comparison:** Track variance per category and visualize trends.  
- **Automatic Notifications:** Daily reminders to log expenses, weekly summaries, monthly reports.  

---

## Benefits of Using BudgetPro
1. **Financial Awareness:** Know exactly where your money goes.  
2. **Budget Control:** Avoid overspending with alerts and optional stops.  
3. **Savings Growth:** Track income and savings with clear progress visualization.  
4. **Actionable Insights:** AI-driven suggestions highlight patterns and unusual expenses.  
5. **Time-Saving:** Quick logging, recurring transactions, and automated reports reduce manual effort.  

---

## Step-by-Step Instructions to Run the Project
1. **Clone the repository:**
```bash
git clone https://github.com/pavankumar-goldenleg/BUDGET_PRO.git
cd BUDGET_PRO
