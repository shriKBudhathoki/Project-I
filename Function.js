let balance = Number(localStorage.getItem("balance")) || 0;

function deposit() {
  let amt = document.getElementById("depo");
  let desc=document.getElementById("depodep");
  let message = document.getElementById("output");

  let amt1= Number(amt.value);
  let desc1=desc.value;

   // Reset previous message
    message.innerText = "";
    message.style.color = "black";

  if(amt1 <= 0){
    alert("Enter a valid amount!");
    return;
  }

  balance += amt1;
  localStorage.setItem("balance", balance);

  showToast(`Deposit Rs.${amt1}.Thankyou For Using Hamro Bank`, "success1");
   
  // Clear input fields
   amt.value = "";
   desc.value = "";

  addToHistory("Deposit", amt1, desc1);
}


function withdrawn() {
    let amountInput = document.getElementById("withdrawn");
    let descInput = document.getElementById("withdep");
    let messageArea = document.getElementById("message");

    let amount = Number(amountInput.value);
    let description = descInput.value;

    // Reset previous message
    messageArea.innerText = "";
    messageArea.style.color = "black";


    if (amount <= 0) {
    messageArea.style.color = "red";
    messageArea.innerText = "Enter a valid amount";
    return;
}

if (amount > balance) {
    messageArea.style.color = "red";
    messageArea.innerText = "Insufficient Balance";
    return;
}

if (balance - amount < 500) {
    alert("Minimum balance of Rs. 500 must be maintained");
    return;
}

    balance -= amount;

    localStorage.setItem("balance", balance);

     showToast(`Withdrawn Rs.${amount}.Thankyou For Using Hamro Bank`, "success");
    // Clear input fields
    amountInput.value = "";
    descInput.value = "";

      addToHistory("Withdrawn", amount, description);
}



let toastTimeout;

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const progress = document.getElementById("toastProgress");

    // Set message
    document.getElementById("toastMessage").innerText = message;

    // Change color
    if (type === "success") toast.className = "fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg opacity-0 transition-opacity duration-300 z-50 overflow-hidden flex items-center justify-between gap-4";
    else if (type === "error") toast.className = "fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded shadow-lg opacity-0 transition-opacity duration-300 z-50 overflow-hidden flex items-center justify-between gap-4";

    //change color

    if (type === "success1") toast.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg opacity-0 transition-opacity duration-300 z-50 overflow-hidden flex items-center justify-between gap-4";
    else if (type === "error") toast.className = "fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded shadow-lg opacity-0 transition-opacity duration-300 z-50 overflow-hidden flex items-center justify-between gap-4";
    // Show toast
    toast.style.opacity = "1";
    progress.style.width = "100%";
    progress.style.transition = "width 5s linear";

    // Animate shrinking
    setTimeout(() => {
        progress.style.width = "0";
    }, 10);

    // Hide automatically after 5s
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.style.opacity = "0";
        progress.style.transition = "none";
        progress.style.width = "100%";
    }, 5000);
}

// Close button stops animation and hides toast
document.getElementById("toastClose").addEventListener("click", () => {
    const toast = document.getElementById("toast");
    const progress = document.getElementById("toastProgress");

    clearTimeout(toastTimeout);
    toast.style.opacity = "0";
    progress.style.transition = "none";
    progress.style.width = "100%";
});


// window.onload = function () {
//   let historyList = JSON.parse(localStorage.getItem("history")) || [];

//   function renderHistory() {
//     const listEl = document.getElementById("historyList");
//     if (!listEl) return; // safeguard
//     listEl.innerHTML = "";
//     historyList.forEach(item => {
//       let li = document.createElement("li");
//       li.innerText = `${item.type} | Rs. ${item.amount} | ${item.description || "No Description"} | ${item.time}`;
//       listEl.appendChild(li);
//     });
//   }

//   renderHistory();

//   // Global function so deposit/withdraw pages can use it
//   window.addToHistory = function (type, amount, description) {
//     const time = new Date().toLocaleString();
//     historyList.unshift({ type, amount, description, time });
//     localStorage.setItem("history", JSON.stringify(historyList));
//     renderHistory();
//   };
// };

window.onload = function () {
  let historyList = JSON.parse(localStorage.getItem("history")) || [];

  function renderHistory() {
    const tableBody = document.getElementById("historyTableBody");
    if (!tableBody) return; // safeguard
    tableBody.innerHTML = "";

    historyList.forEach(item => {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td class="border p-2">${item.type}</td>
        <td class="border p-2">Rs. ${item.amount}</td>
        <td class="border p-2">${item.description || "No Description"}</td>
        <td class="border p-2">${item.time}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  renderHistory();

  // Make addToHistory global so deposit/withdraw pages can use it
  window.addToHistory = function (type, amount, description) {
    const time = new Date().toLocaleString();
    historyList.unshift({ type, amount, description, time });
    localStorage.setItem("history", JSON.stringify(historyList));
    renderHistory();
  };
};
