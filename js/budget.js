document.getElementById("saveBudget").addEventListener("click", function(){
  let amount = document.getElementById("budgetAmount").value;
  saveBudget(amount);
  alert("Budget Saved!");
});
