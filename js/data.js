// js/data.js

// --- Income/Expense storage ---
function getIncome() { return JSON.parse(localStorage.getItem("income") || "[]"); }
function getExpenses() { return JSON.parse(localStorage.getItem("expenses") || "[]"); }

function addIncome(income) {
  const incomes = getIncome();
  incomes.push(income);
  localStorage.setItem("income", JSON.stringify(incomes));
}

function addExpense(expense) {
  const expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// --- Limits per category ---
function getLimits() { return JSON.parse(localStorage.getItem("limits") || "{}"); }
function setLimit(category, value) {
  const limits = getLimits();
  limits[category] = value;
  localStorage.setItem("limits", JSON.stringify(limits));
}

// --- General Budget ---
function getBudget() { return Number(localStorage.getItem("budget") || 0); }
function setBudget(value) { localStorage.setItem("budget", value); }

// --- Month Selection ---
function getSelectedMonth() { return localStorage.getItem("selectedMonth") || new Date().toISOString().slice(0,7); }
function setSelectedMonth(month) { localStorage.setItem("selectedMonth", month); }

// --- Utility ---
function formatCurrency(value) { return "₹" + Number(value).toLocaleString(); }
