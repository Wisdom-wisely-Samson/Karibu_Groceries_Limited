/* PRODUCE TYPE */
function validateProduceType() {
  let produceType = document.getElementById("type").value.trim();
  let typeError = document.getElementById("type-error");

  if (produceType.length < 2) {
    typeError.innerHTML = "Produce type required";
    typeError.style.color = "red";
    return false;
  }

  typeError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
/* Cost */
function validateCost() {
  let cost = Number(document.getElementById("cost").value);
  let costError = document.getElementById("cost-error");

  if (!cost) {
    costError.innerHTML = "Cost required";
    costError.style.color = "red";
    return false;
  }

  if (cost < 10000) {
    costError.innerHTML = "Minimum UGX 10,000";
    costError.style.color = "red";
    return false;
  }

  costError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
/* PRICE */
function validatePrice() {
  let price = Number(document.getElementById("price").value);
  let priceError = document.getElementById("price-error");

  if (!price) {
    priceError.innerHTML = "Price required";
    priceError.style.color = "red";
    return false;
  }

  if (price < 10000) {
    priceError.innerHTML = "Minimum UGX 10,000";
    priceError.style.color = "red";
    return false;
  }

  priceError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}

/* DEALER NAME */
function validateDealerName() {
  let dealer = document.getElementById("dealer").value.trim();
  let dealerError = document.getElementById("dealer-error");

  if (dealer.length < 2) {
    dealerError.innerHTML = "Dealer name required";
    dealerError.style.color = "red";
    return false;
  }

  dealerError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
