// NIN
function validateNIN() {
  let nin = document.getElementById("nin").value.trim();
  let ninError = document.getElementById("nin-error");

  if (nin.length < 13 || nin.length === 0) {
    ninError.innerHTML = "NIN required";
    ninError.style.color = "red";
    return false;
  }
  if (nin.length > 13) {
    ninError.innerHTML = "NIN must be 13 characters";
    ninError.style.color = "red";
    return false;
  }

  ninError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
// LOCATION
function validateLocation() {
  let location = document.getElementById("location").value.trim();
  let locationError = document.getElementById("location-error");
  if (location.length < 2) {
    locationError.innerHTML = "Location required";
    locationError.style.color = "red";
    return false;
  }

  locationError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
//   DUE DATE
function validateDueDate() {
  let dueDate = document.getElementById("due-date").value;
  let dueDateError = document.getElementById("due-date-error");
  if (!dueDate) {
    dueDateError.innerHTML = "Due date required";
    dueDateError.style.color = "red";
    return false;
  }

  dueDateError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
//   AMOUNT DUE
function validateAmountDue() {
  let amountDue = Number(document.getElementById("amountDue").value);
  let amountDueError = document.getElementById("amountDue-error");
  if (!amountDue) {
    amountDueError.innerHTML = "Amount due required";
    amountDueError.style.color = "red";
    return false;
  }
  if (amountDue < 10000) {
    amountDueError.innerHTML = "Minimum UGX 10,000";
    amountDueError.style.color = "red";
    return false;
  }
  amountDueError.innerHTML = '<i class="fa fa-check-circle"></i>';
  return true;
}
