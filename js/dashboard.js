// ===============================
// BudgetPro - Dashboard Script
// ===============================

let expenseChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
  updateAlertUI();

});

// ===============================
// MAIN UPDATE FUNCTION
// ===============================
function updateDashboard() {
  const incomes = JSON.parse(localStorage.getItem("income")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = totalIncome - totalExpense;

  // Update UI
  document.getElementById("totalIncome").textContent = "₹" + totalIncome;
  document.getElementById("totalExpense").textContent = "₹" + totalExpense;
  document.getElementById("balance").textContent = "₹" + balance;

  updateExpenseChart(expenses);
  checkLimits(expenses);

}

// ===============================
// PIE CHART
// ===============================
function updateExpenseChart(expenses) {
  const ctx = document.getElementById("expenseChart");

  if (!ctx) return;

  // Group expenses by category
  const categoryTotals = {};

  expenses.forEach(exp => {
    const category = exp.category.toLowerCase();
    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(exp.amount);
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  // Destroy old chart before re-creating
  if (expenseChartInstance) {
    expenseChartInstance.destroy();
  }

  expenseChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

// ===============================
// CLEAR ALL DATA
// ===============================
function clearAllData() {
  if (confirm("Are you sure you want to delete ALL data?")) {
    localStorage.clear();
    location.reload();
  }
}

//limit alerts
function checkLimits(expenses) {
  const limits = JSON.parse(localStorage.getItem("limits")) || {};
  const alerts = JSON.parse(localStorage.getItem("alerts")) || [];

  const categoryTotals = {};

  expenses.forEach(exp => {
    const category = exp.category.toLowerCase();
    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(exp.amount);
  });

  for (let category in limits) {
    const spent = categoryTotals[category] || 0;
    const limit = Number(limits[category]);

    if (spent > limit) {
      const message = `Limit exceeded for ${category}. Spent ₹${spent}, Limit ₹${limit}`;

      if (!alerts.includes(message)) {
        alerts.push(message);
      }
    }
  }

  localStorage.setItem("alerts", JSON.stringify(alerts));
  updateAlertUI();
}

function toggleAlerts() {
  const panel = document.getElementById("alertsPanel");
  panel.classList.toggle("translate-x-full");
}

function updateAlertUI() {
  const alerts = JSON.parse(localStorage.getItem("alerts")) || [];
  const list = document.getElementById("alertsList");
  const count = document.getElementById("alertCount");

  list.innerHTML = "";

  if (alerts.length === 0) {
    list.innerHTML = "<p>No alerts 🎉</p>";
    count.classList.add("hidden");
    return;
  }

  alerts.forEach(alert => {
    const div = document.createElement("div");
    div.className = "bg-slate-800 p-3 rounded-lg border border-yellow-500/30";
    div.textContent = alert;
    list.appendChild(div);
  });

  count.textContent = alerts.length;
  count.classList.remove("hidden");
}

function clearAlerts() {
  localStorage.removeItem("alerts");
  updateAlertUI();
}

