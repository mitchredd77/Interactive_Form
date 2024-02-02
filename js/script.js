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
