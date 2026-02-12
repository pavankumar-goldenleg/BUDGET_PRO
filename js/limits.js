document.addEventListener("DOMContentLoaded", () => {
  renderLimits();
});

function getLimits() {
  return JSON.parse(localStorage.getItem("limits")) || {};
}

function saveLimit() {
  const category = document.getElementById("limitCategory").value.trim();
  const amount = document.getElementById("limitAmount").value;

  if (!category || !amount) {
    alert("Please enter category and amount.");
    return;
  }

  const limits = getLimits();
  limits[category.toLowerCase()] = Number(amount);

  localStorage.setItem("limits", JSON.stringify(limits));

  document.getElementById("limitCategory").value = "";
  document.getElementById("limitAmount").value = "";

  renderLimits();
}

function deleteLimit(category) {
  const limits = getLimits();
  delete limits[category];
  localStorage.setItem("limits", JSON.stringify(limits));
  renderLimits();
}

function renderLimits() {
  const limits = getLimits();
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const container = document.getElementById("limitsContainer");
  const summary = document.getElementById("limitSummary");

  container.innerHTML = "";

  let totalLimit = 0;
  let totalSpent = 0;

  Object.keys(limits).forEach(category => {

    const limitAmount = Number(limits[category]);

    const spent = expenses
      .filter(e => e.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const percent = limitAmount > 0
      ? Math.min((spent / limitAmount) * 100, 100)
      : 0;

    totalLimit += limitAmount;
    totalSpent += spent;

    let barColor = "bg-green-500";
    if (percent > 75) barColor = "bg-yellow-500";
    if (percent >= 100) barColor = "bg-red-500";

    container.innerHTML += `
      <div class="bg-slate-800 p-6 rounded-xl shadow-lg">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-lg font-bold">${category}</h3>
          <button onclick="deleteLimit('${category}')"
            class="text-red-400 hover:text-red-300 text-sm">
            Delete
          </button>
        </div>

        <p class="text-sm mb-2">₹${spent} / ₹${limitAmount}</p>

        <div class="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
          <div class="${barColor} h-3"
               style="width:${percent}%"></div>
        </div>

        <p class="text-xs mt-2">${percent.toFixed(0)}% used</p>
      </div>
    `;
  });

  summary.innerHTML = `
    Total Limit: ₹${totalLimit} |
    Total Spent: ₹${totalSpent}
  `;
}

