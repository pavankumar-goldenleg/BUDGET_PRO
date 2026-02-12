document.addEventListener("DOMContentLoaded", function () {

  const incomeData = JSON.parse(localStorage.getItem("income")) || [];
  const expenseData = JSON.parse(localStorage.getItem("expenses")) || [];

  const totalIncome = incomeData.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = expenseData.reduce((sum, e) => sum + Number(e.amount), 0);
  const savings = totalIncome - totalExpense;

  // ---------- 1️⃣ Income vs Expense ----------
  new Chart(document.getElementById("incomeExpenseChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount (₹)",
        data: [totalIncome, totalExpense],
        backgroundColor: ['#22c55e', '#f97316'],
        borderRadius: 12
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1200, easing: 'easeOutBounce' },
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // ---------- 2️⃣ Savings Overview (Perfect circle) ----------
  new Chart(document.getElementById("savingsChart"), {
    type: "doughnut",
    data: {
      labels: ["Saved", "Spent"],
      datasets: [{
        data: [savings > 0 ? savings : 0, totalExpense],
        backgroundColor: ['#2563eb', '#ef4444'],
        borderWidth: 2,
        hoverOffset: 15
      }]
    },
    options: { responsive: true, maintainAspectRatio: true, animation: { animateRotate: true } }
  });

  // ---------- 3️⃣ Category Spending (Circle pie chart) ----------
  const categoryTotals = {};
  expenseData.forEach(e => {
    const key = e.category || "Other";
    categoryTotals[key] = (categoryTotals[key] || 0) + Number(e.amount);
  });

  new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map((_, i) => `hsl(${i*60 % 360}, 70%, 50%)`),
        hoverOffset: 15
      }]
    },
    options: { responsive: true, maintainAspectRatio: true, animation: { duration: 1200, easing: 'easeOutElastic' } }
  });

  // ---------- 4️⃣ Monthly Spending ----------
  const monthlyTotals = {};
  expenseData.forEach(e => {
    const month = new Date(e.date).toLocaleString("default", { month: "short" });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(e.amount);
  });

  new Chart(document.getElementById("monthlyChart"), {
    type: "line",
    data: {
      labels: Object.keys(monthlyTotals),
      datasets: [{
        label: "Monthly Spending",
        data: Object.values(monthlyTotals),
        borderColor: "#facc15",
        backgroundColor: "rgba(250,204,21,0.3)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8
      }]
    },
    options: { responsive: true, animation: { duration: 1500, easing: 'easeOutQuad' } }
  });

  // ---------- 5️⃣ Category Spending Over Months ----------
  const categoryTime = {};
  expenseData.forEach(e => {
    const month = new Date(e.date).toLocaleString("default", { month: "short" });
    if (!categoryTime[e.category]) categoryTime[e.category] = {};
    categoryTime[e.category][month] = (categoryTime[e.category][month] || 0) + Number(e.amount);
  });

  const months = [...new Set(expenseData.map(e => new Date(e.date).toLocaleString("default", { month: "short" })))];

  const categoryDatasets = Object.keys(categoryTime).map((cat, idx) => ({
    label: cat,
    data: months.map(m => categoryTime[cat][m] || 0),
    backgroundColor: `hsl(${idx*60 % 360}, 70%, 50%)`
  }));

  new Chart(document.getElementById("categoryTimeChart"), {
    type: "bar",
    data: { labels: months, datasets: categoryDatasets },
    options: { responsive: true, animation: { duration: 1500 }, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
  });

  // ---------- 6️⃣ Income vs Savings Trend ----------
  const monthsAll = [...new Set([...incomeData.map(i => new Date(i.date).toLocaleString("default", { month: "short" })), ...expenseData.map(e => new Date(e.date).toLocaleString("default", { month: "short" }))])];

  const incomeTrend = monthsAll.map(m => incomeData.filter(i => new Date(i.date).toLocaleString("default", { month: "short" }) === m).reduce((sum,i)=>sum+Number(i.amount),0));
  const savingsTrend = monthsAll.map((m, idx) => incomeTrend[idx] - (expenseData.filter(e => new Date(e.date).toLocaleString("default",{month:"short"})===m).reduce((sum,e)=>sum+Number(e.amount),0)));

  new Chart(document.getElementById("incomeSavingsChart"), {
    type: "line",
    data: {
      labels: monthsAll,
      datasets: [
        { label: "Income", data: incomeTrend, borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.2)", fill: true, tension: 0.4, pointRadius: 4 },
        { label: "Savings", data: savingsTrend, borderColor: "#2563eb", backgroundColor: "rgba(37,99,235,0.2)", fill: true, tension: 0.4, pointRadius: 4 }
      ]
    },
    options: { responsive: true, animation: { duration: 1500, easing: 'easeOutQuad' } }
  });

});

