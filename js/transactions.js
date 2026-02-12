document.addEventListener("DOMContentLoaded", () => {

  const list = document.getElementById("transactionList");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");
  const exportBtn = document.getElementById("exportBtn");

  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let transactions = [
    ...incomes.map(i => ({ ...i, type: "income" })),
    ...expenses.map(e => ({ ...e, type: "expense" }))
  ];

  transactions.sort((a,b)=> new Date(b.date) - new Date(a.date));

  function render() {

    const search = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    list.innerHTML = "";

    const filtered = transactions.filter(t => {

      const matchSearch =
        (t.source || t.category || "")
          .toLowerCase()
          .includes(search);

      const matchFilter =
        filter === "all" || t.type === filter;

      return matchSearch && matchFilter;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<p class="text-slate-400">No transactions found.</p>`;
      return;
    }

    filtered.forEach(t => {

      const card = document.createElement("div");

      card.className =
        "bg-slate-800 p-4 rounded-xl flex justify-between items-center transition transform hover:scale-105";

      card.innerHTML = `
        <div>
          <p class="font-semibold">
            ${t.source || t.category}
          </p>
          <p class="text-xs text-slate-400">
            ${t.date}
          </p>
        </div>

        <p class="${
          t.type === "income" ? "text-green-400" : "text-red-400"
        } font-bold text-lg">
          ${t.type === "income" ? "+" : "-"} ₹${t.amount}
        </p>
      `;

      list.appendChild(card);
    });
  }

  searchInput.addEventListener("input", render);
  filterSelect.addEventListener("change", render);
  exportBtn.addEventListener("click", exportPDF);

  render();
});

function exportPDF() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let y = 20;

  doc.setFontSize(16);
  doc.text("BudgetPro Transactions Report", 20, 10);

  incomes.forEach(i => {
    doc.text(`Income ₹${i.amount} - ${i.source}`, 20, y);
    y += 8;
  });

  expenses.forEach(e => {
    doc.text(`Expense ₹${e.amount} - ${e.category}`, 20, y);
    y += 8;
  });

  doc.save("BudgetPro_Transactions.pdf");
}

