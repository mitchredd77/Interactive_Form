//Name - focus name Input
window.onload = function () {
  document.getElementById("name").focus();
};

//Job Title Section, listener for other job role input box visibility change
const title = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
otherJobRole.style.display = "none";
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
//Time of activity for validation with others
activities.addEventListener("change", (e) => {
  let totalCost = 0;
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  //Loop through all checkboxes and enable all
  allCheckboxes.forEach(checkbox => {
      checkbox.disabled = false; // Reset all checkboxes to enabled
      checkbox.parentElement.classList.remove("disabled");
  });
  //Assign all checked checkboxes to a variable and then loop through them to assign the time to selectedTime
  const checkedActivities = document.querySelectorAll('input[type="checkbox"]:checked');
  checkedActivities.forEach(currentCheckbox => {
      const selectedTime = currentCheckbox.dataset.dayAndTime;
      //disable all check boxes with a matching event time
      allCheckboxes.forEach(checkbox => {
          if (checkbox !== currentCheckbox && checkbox.dataset.dayAndTime === selectedTime) {
              checkbox.parentElement.classList.add("disabled");
              checkbox.disabled = true; // Disable checkboxes with matching time
          }
      });
      
      totalCost += parseInt(currentCheckbox.dataset.cost);
  });

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
const emailHint = document.getElementById("email-hint");
const cardNumberInput = document.getElementById("cc-num");
const zipCodeInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const form = document.querySelector("form");
const isValidName = () => /^\S+$/.test(nameInput.value);
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value);
const isValidCardNumber = () => /^\d{13,16}$/.test(cardNumberInput.value);
const isValidZipCode = () => /^\d{5}$/.test(zipCodeInput.value);
const isValidCVV = () => /^\d{3}$/.test(cvvInput.value);

//Function to validate the input fields except for the activites
const validator = (inputElement, validationFunction, e) => {
  if (!validationFunction()) {
    e.preventDefault();
    inputElement.parentElement.classList.add("not-valid");
    inputElement.parentElement.classList.remove("valid");
    inputElement.nextElementSibling.style.display = "block";
  }
};
form.addEventListener("submit", (e) => {
  validator(cardNumberInput, isValidCardNumber, e);
  validator(zipCodeInput, isValidZipCode, e);
  validator(cvvInput, isValidCVV, e);

 // confirms at least one activity is selected
  if (document.querySelectorAll('input[type="checkbox"]:checked').length < 1) {
    e.preventDefault();
    document.getElementById("activities-hint").style.display = "block";
  }
});
nameInput.addEventListener("keyup", (e) => {
  validator(nameInput, isValidName, e);
});
emailInput.addEventListener("input", (e) => {
  if (emailInput.value === '') {
    emailHint.textContent = "It\'s not advised to not submit an email address";
  } else {
  emailHint.textContent = 'Email address must be formatted correctly';
  validator(emailInput, isValidEmail, e);
  }
  });