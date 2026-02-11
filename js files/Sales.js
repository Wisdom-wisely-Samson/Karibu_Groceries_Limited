/* FINAL SUBMIT */
function sellProduce() {
  if (
    !validateProduce() ||
    !validateTonnage() ||
    !validateAmount() ||
    !validateBuyerName() ||
    !validateAgentName()
  ) {
    document.getElementById("sale-error").innerHTML =
      "Please fill all fields before submitting";
    document.getElementById("sale-error").style.color = "red";
    return;
  }

  document.getElementById("saleMsg").style.display = "block";
}
