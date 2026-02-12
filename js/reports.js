document.addEventListener("DOMContentLoaded", function () {

  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];

  const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenseData.reduce((sum, e) => sum + e.amount, 0);
  const savings = totalIncome - totalExpense;

  // 1️⃣ Income vs Expense
  new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount (₹)",
        data: [totalIncome, totalExpense],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200 }
    }
  });

  // 2️⃣ Savings
  new Chart(document.getElementById("savingsChart"), {
    type: "doughnut",
    data: {
      labels: ["Saved", "Spent"],
      datasets: [{
        data: [savings > 0 ? savings : 0, totalExpense]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { animateScale: true }
    }
  });

  // 3️⃣ Category Spending
  const categoryTotals = {};
  expenseData.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1500 }
    }
  });

  // 4️⃣ Monthly Summary
  const monthlyTotals = {};
  expenseData.forEach(e => {
    const month = new Date(e.date).toLocaleString("default", { month: "short" });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
  });

  new Chart(document.getElementById("monthlyChart"), {
    type: "line",
    data: {
      labels: Object.keys(monthlyTotals),
      datasets: [{
        label: "Monthly Spending",
        data: Object.values(monthlyTotals),
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1500 }
    }
  });

});
