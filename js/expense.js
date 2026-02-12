document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("expenseForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!amount || !category) return;

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push({
      amount,
      category,
      date: new Date().toISOString()
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense Added Successfully!");

    window.location.href = "index.html";
  });

});
