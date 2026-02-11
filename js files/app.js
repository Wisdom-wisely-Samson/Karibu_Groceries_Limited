var produceError = document.getElementById("produce-error");
var tonnageError = document.getElementById("tonnage-error");
var amountError = document.getElementById("amount-error");
var buyerError = document.getElementById("buyer-error");
var agentError = document.getElementById("agent-error");

/* PRODUCE */
function validateProduce() {
  let produce = document.getElementById("sProduce").value.trim();

  if (produce.length < 2) {
    produceError.innerHTML = "Produce name required";
    produceError.style.color = "red";
    return false;
  }

  produceError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}

/* TONNAGE */
function validateTonnage() {
  let tonnage = document.getElementById("sTonnage").value;

  if (tonnage === "") {
    tonnageError.innerHTML = "Tonnage required";
    tonnageError.style.color = "red";
    return false;
  }

  if (tonnage < 1000) {
    tonnageError.innerHTML = "Minimum is 1000kg";
    tonnageError.style.color = "red";
    return false;
  }

  tonnageError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}

/* AMOUNT */
function validateAmount() {
  let amount = Number(document.getElementById("amount").value);

  if (!amount) {
    amountError.innerHTML = "Amount required";
    amountError.style.color = "red";
    return false;
  }

  if (amount < 10000) {
    amountError.innerHTML = "Minimum UGX 10,000";
    amountError.style.color = "red";
    return false;
  }

  amountError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
/* BUYER */
function validateBuyerName() {
  let buyer = document.getElementById("buyer").value.trim();

  if (buyer.length < 2) {
    buyerError.innerHTML = "Buyer name required";
    buyerError.style.color = "red";
    return false;
  }

  buyerError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}

/* AGENT */
function validateAgentName() {
  let agent = document.getElementById("agent").value.trim();

  if (agent.length < 2) {
    agentError.innerHTML = "Agent name required";
    agentError.style.color = "red";
    return false;
  }

  agentError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
// CONTACT //
function validateContact() {
  let contact = document.getElementById("contact").value.trim();
  let contactError = document.getElementById("contact-error");
  if (contact.length < 10 || contact.length === 0) {
    contactError.innerHTML = "Contact required";
    contactError.style.color = "red";
    return false;
  }
  if (contact.length > 10) {
    contactError.innerHTML = "Contact must be 10 digits";
    contactError.style.color = "red";
    return false;
  }
  contactError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
// DATE
function validateDate() {
  let date = document.getElementById("date").value;
  let dateError = document.getElementById("date-error");
  if (!date) {
    dateError.innerHTML = "Date required";
    dateError.style.color = "red";
    return false;
  }
  dateError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
const API = "http://localhost:5000";

// ADD PRODUCE
function addProduce() {
  fetch(API + "/produce/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name.value,
      type: type.value,
      tonnage: tonnage.value,
      cost: cost.value,
      sellingPrice: price.value,
      dealerName: dealer.value,
      contact: contact.value,
      branch: branch.value
    })
  })
  .then(res => res.json())
  .then(data => msg.innerText = data.message);
}

// SELL PRODUCE
function sellProduce() {
  fetch(API + "/sales/sell", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      produceName: sProduce.value,
      tonnage: sTonnage.value,
      amountPaid: amount.value,
      buyerName: buyer.value,
      salesAgent: agent.value,
      branch: sBranch.value
    })
  })
  .then(res => res.json())
  .then(data => saleMsg.innerText = data.message);
}

// CREDIT SALE
function creditSale() {
  fetch(API + "/credit/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      buyerName: cBuyer.value,
      nin: nin.value,
      location: location.value,
      contact: cContact.value,
      amountDue: amountDue.value,
      salesAgent: cAgent.value,
      produceName: produce.value,
      tonnage: cTonnage.value,
      dueDate: dueDate.value,
      dispatchDate: new Date()
    })
  })
  .then(res => res.json())
  .then(data => creditMsg.innerText = data.message);
}

// DIRECTOR TOTALS
function loadTotals() {
  fetch(API + "/director/totals")
    .then(res => res.json())
    .then(data => {
      report.innerHTML = "";
      data.forEach(r => {
        report.innerHTML += `<li>${r._id}: UGX ${r.totalSales}</li>`;
      });
    });
}
