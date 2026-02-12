document.addEventListener("DOMContentLoaded", () => {
  renderLimits();
});

// ---------- LIMITS STORAGE ----------
function getLimits() {
  return JSON.parse(localStorage.getItem("limits")) || {};
}

function saveLimit() {
  const category = document.getElementById("limitCategory").value.trim();
  const amount = Number(document.getElementById("limitAmount").value);

  if (!category || !amount) {
    alert("Please enter category and amount.");
    return;
  }

  const limits = getLimits();
  limits[category.toLowerCase()] = amount;
  localStorage.setItem("limits", JSON.stringify(limits));

  document.getElementById("limitCategory").value = "";
  document.getElementById("limitAmount").value = "";

  renderLimits();
}

function deleteLimit(category) {
  const limits = getLimits();
  delete limits[category];
  localStorage.setItem("limits", JSON.stringify(limits));

  const alerted = JSON.parse(localStorage.getItem("alertedCategories")) || {};
  delete alerted[category];
  localStorage.setItem("alertedCategories", JSON.stringify(alerted));

  renderLimits();
}

// ---------- ALERT TRACKER ----------
function getAlertedCategories() {
  return JSON.parse(localStorage.getItem("alertedCategories")) || {};
}

function saveAlertedCategories(obj) {
  localStorage.setItem("alertedCategories", JSON.stringify(obj));
}

// ---------- RENDER LIMITS ----------
function renderLimits() {
  const limits = getLimits();
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const container = document.getElementById("limitsContainer");
  const summary = document.getElementById("limitSummary");

  container.innerHTML = "";

  let totalLimit = 0;
  let totalSpent = 0;

  const alertedCategories = getAlertedCategories();

  Object.keys(limits).forEach(category => {
    const limitAmount = Number(limits[category]);

    const spent = expenses
      .filter(e => e.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const percent = limitAmount > 0
      ? (spent / limitAmount) * 100
      : 0;

    // ---------- TRIGGER ALERT AT 90% ONCE ----------
    if (percent >= 90 && percent < 100) {
      if (!alertedCategories[category]) {
        addAlert(`⚠ ${category} spending reached ${percent.toFixed(0)}% of limit!`);
        alertedCategories[category] = true;
        saveAlertedCategories(alertedCategories);
      }
    }

    // ---------- RESET ALERT IF SPENDING GOES BELOW 90% ----------
    if (percent < 90 && alertedCategories[category]) {
      delete alertedCategories[category];
      saveAlertedCategories(alertedCategories);
    }

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
               style="width:${Math.min(percent, 100)}%"></div>
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
