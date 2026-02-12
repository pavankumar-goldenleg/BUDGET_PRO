console.log("Income JS Loaded");

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("incomeForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const source = document.getElementById("source").value;

    if (!amount || !source) return;

    const income = JSON.parse(localStorage.getItem("income")) || [];

    income.push({
      amount,
      source,
      date: new Date().toISOString()
    });

    localStorage.setItem("income", JSON.stringify(income));

    alert("Income Added Successfully!");

    window.location.href = "index.html";
  });

});

