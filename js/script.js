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
    otherJobRole.style.display = "none";
 }
});

// T-Shirt Info Section
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
colorSelect.disabled = true;

designSelect.addEventListener("change", (e) => {
  const selectedTheme = designSelect.value;
  const colorOptions = colorSelect.options;

  // Find the first available color option for the selected theme
  for (let i = 1; i < colorOptions.length; i++) {
    const option = colorOptions[i];
    if (option.dataset.theme === selectedTheme) {
      colorSelect.value = option.value;
      break;
    }
  }
  colorSelect.disabled = false;
  // Show/hide color options based on the selected theme
  for (let i = 1; i < colorSelect.options.length; i++) { 
    const option = colorSelect.options[i];
    if (option.dataset.theme !== selectedTheme) {
    option.style.display = "none";
  }  else {
      option.style.display = "";
  }
  }
});

//Activities Section
const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
//focus and blur 
allCheckboxes.forEach(checkbox => {
  // Focus event listener
  checkbox.addEventListener("focus", () => {
  checkbox.parentElement.classList.add("focus");
  });

  // Blur event listener
  checkbox.addEventListener("blur", () => {
    const focusedLabel = activities.querySelector("label.focus");
    if (focusedLabel) {
      focusedLabel.classList.remove("focus");
    }
  });
});
activities.addEventListener("change", (e) => {
  let totalCost = 0;
  
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
//function to disable credit card fields if paypay or bitcoin are selected
function disableCC() {
  document.querySelector(".expiration-box").style.display = "none";
  document.querySelector(".cvv-box").style.display = "none";
  document.querySelector(".year-box").style.display = "none";
  document.querySelector(".credit-card-box").style.display = "none";
  document.querySelector(".zip-box").style.display = "none";
}
function enableCC() {
  document.querySelector(".expiration-box").style.display = "block";
  document.querySelector(".cvv-box").style.display = "block";
  document.querySelector(".year-box").style.display = "block";
  document.querySelector(".credit-card-box").style.display = "block";
  document.querySelector(".zip-box").style.display = "block";

}
const disablePaypal = () => {document.getElementById("paypal").style.display = "none"};
const disableBitcoin = () => {document.getElementById("bitcoin").style.display = "none"};
const enablePaypal = () => {document.getElementById("paypal").style.display = "block"};
const enableBitcoin = () => {document.getElementById("bitcoin").style.display = "block"};
payment.value = "credit-card";
disableBitcoin();
disablePaypal();
payment.addEventListener("change", (e) => {
  if (e.target.value === "paypal") {
    enablePaypal();
    disableCC();
    disableBitcoin();
  } else if (e.target.value === "bitcoin") {
      enableBitcoin();
      disableCC();
      disablePaypal();
    } else {
        enableCC();
        disableBitcoin();
        disablePaypal();
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
  } else {
     //Input is valid, remove error styles and hide message
     inputElement.parentElement.classList.remove("not-valid");
     inputElement.parentElement.classList.add("valid");  // Optional: Add a valid class
     inputElement.nextElementSibling.style.display = "none";
  }
};
form.addEventListener("submit", (e) => {
  validator(nameInput, isValidName, e);
  validator(emailInput, isValidEmail, e);
  if (document.getElementById("payment").value === "credit-card") {
      validator(cardNumberInput, isValidCardNumber, e);
      validator(zipCodeInput, isValidZipCode, e);
      validator(cvvInput, isValidCVV, e);
  }

 // confirms at least one activity is selected
 const allCheckboxes = form.querySelectorAll('input[type=checkbox]');
 const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
 const activitiesHint = document.getElementById('activities-hint');
 allCheckboxes.forEach(checkbox => {
   if (checkboxes.length < 1) {
    e.preventDefault();
    document.getElementById("activities").classList.add("not-valid")
    document.getElementById("activities").classList.remove("valid")
    activitiesHint.style.display = "block";
  } else if (checkboxes.length >= 1){
    document.getElementById("activities").classList.remove("not-valid")
    document.getElementById("activities").classList.add("valid")
    activitiesHint.style.display = "none";
  }
});
});
// warning if the name field is blank or empty
nameInput.addEventListener("keyup", (e) => {
  validator(nameInput, isValidName, e);
});
//Warning if the field is blank and  warning if it's not formatted correctly
emailInput.addEventListener("input", (e) => {
  if (emailInput.value === '') {
    emailHint.textContent = "It\'s not advised to not submit an email address";
  } else if (!validator(emailInput, isValidEmail, e)) {
    emailHint.textContent = "Please enter a valid email address";
  }
  });