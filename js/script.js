//Name - focus name Input
document.getElementById("name").focus();

//Job Title Section, listener for other job role input box visibility change
const title = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
title.addEventListener("change", (e) => {
 if (title.value === "other") {
    otherJobRole.style.display = "block";
 } else {
    console.log(title.value);
    otherJobRole.style.display = "none";
 }
});

//T-Shirt Info Secion
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
colorSelect.disabled = true;

designSelect.addEventListener("change", (e) => {
  const selectedTheme = designSelect.value;
  const colorOptions =colorSelect.options;
  if (e.target) {
    colorSelect.disabled = false;
  }
  // Loop through color options and remove option non-matching data-theme option
  for (let i = 1; i < colorSelect.options.length; i++) { 
    const option = colorSelect.options[i];
    if (option.dataset.theme !== selectedTheme) {
      option.style.display = "none";
    } else {
      option.style.display = "";
    }
  }
});

//Activities Section
const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");

activities.addEventListener("change", (e) => {
   let totalCost = 0;
   const checkedActivities = document.querySelectorAll('input[type="checkbox"]:checked');
   for (let i = 0; i < checkedActivities.length; i++) {
     totalCost += parseInt(checkedActivities[i].dataset.cost)
   }
   activitiesCost.textContent = "Total: $" + totalCost;
});

//Payment Info Section
const payment = document.getElementById("payment");
const creditCardFields = document.getElementById("payment").querySelectorAll("input, select");
// set default value to credit card
payment.value = "credit-card";
payment.addEventListener("change", (e) => {
  if (e.target.value !== "credit-card") {
     document.querySelector(".expiration-box").style.display = "none";
     document.querySelector(".cvv-box").style.display = "none";
     document.querySelector(".year-box").style.display = "none";
     document.querySelector(".credit-card-box").style.display = "none";
     document.querySelector(".zip-box")
  } else {
     document.querySelector(".expiration-box").style.display = "block";
     document.querySelector(".cvv-box").style.display = "block";
     document.querySelector(".year-box").style.display = "block";
     document.querySelector(".credit-card-box").style.display = "block";
     document.querySelector(".zip-box").style.display = "block";
  }
});

// Form Validation
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  if (nameInput.value.trim() === "") {
    e.preventDefault();
    nameInput.nextElementSibling.style.display = "block";
  }
  if (!/^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value.trim())) {
    e.preventDefault();
    emailInput.nextElementSibling.style.display = "block";
  }
  if (document.querySelectorAll('input[type="checkbox"]:checked').length < 1) {
    e.preventDefault();
    document.getElementById("activities-hint").style.display = "block";
  }
});