// ==================== ABOUT MODAL ====================

document.addEventListener("DOMContentLoaded", () => {

  const modalHTML = `
  <div id="aboutModal" class="fixed inset-0 bg-slate-950/90 backdrop-blur-lg hidden items-center justify-center z-50 p-4">
    <div class="bg-slate-800 border border-blue-500/30 max-w-2xl w-full rounded-3xl p-8 relative shadow-2xl">

      <button onclick="toggleAboutModal()" 
        class="absolute top-5 right-6 text-slate-400 hover:text-white text-2xl">
        ✕
      </button>

      <div class="text-center mb-8">
        <h2 class="text-3xl font-black text-blue-400 mb-2">Why BudgetPro?</h2>
        <p class="text-slate-400 italic">Turning financial chaos into clarity.</p>
      </div>

      <div class="space-y-5 text-slate-300">
        <div class="flex gap-4"><span class="text-2xl">📊</span><p>Visual reports for income, expenses, savings and limits.</p></div>
        <div class="flex gap-4"><span class="text-2xl">🎯</span><p>Set category spending limits and track usage in real-time.</p></div>
        <div class="flex gap-4"><span class="text-2xl">📁</span><p>Export transactions to PDF with filtering and search.</p></div>
        <div class="flex gap-4"><span class="text-2xl">🔒</span><p>100% local storage — your financial data never leaves your device.</p></div>
      </div>

      <button onclick="toggleAboutModal()" 
        class="w-full mt-8 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition">
        GET STARTED
      </button>

    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Render any saved alerts on page load
  renderAlerts();
});

function toggleAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (!modal) return;
  modal.classList.toggle("hidden");
  modal.classList.toggle("flex");
}

// ==================== GLOBAL ALERTS ====================

function getAlerts() {
  return JSON.parse(localStorage.getItem("alerts")) || [];
}

function saveAlerts(alerts) {
  localStorage.setItem("alerts", JSON.stringify(alerts));
}

function addAlert(message) {
  const alerts = getAlerts();
  if (!alerts.includes(message)) {
    alerts.unshift(message); // newest first
    saveAlerts(alerts);
  }
  renderAlerts();
}

function renderAlerts() {
  const alerts = getAlerts();
  const alertsList = document.getElementById("alertsList");
  if (!alertsList) return;

  alertsList.innerHTML = "";
  alerts.forEach(msg => {
    const alertEl = document.createElement("div");
    alertEl.className = "bg-yellow-600 text-black px-3 py-2 rounded shadow";
    alertEl.textContent = msg;
    alertsList.appendChild(alertEl);
  });

  const alertCount = document.getElementById("alertCount");
  if (alertCount) {
    if (alerts.length > 0) {
      alertCount.classList.remove("hidden");
      alertCount.textContent = alerts.length;
    } else {
      alertCount.classList.add("hidden");
    }
  }
}

function toggleAlerts() {
  const panel = document.getElementById("alertsPanel");
  if (panel) panel.classList.toggle("translate-x-full");
}

function clearAlerts() {
  saveAlerts([]);
  renderAlerts();

  // reset category alert tracker too
  localStorage.removeItem("alertedCategories");
}
