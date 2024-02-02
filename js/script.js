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
const color = document.getElementById("color");
const design = document.getElementById("design");
color.disabled = true;
design.addEventListener("change", (e) => {
  if (e.target) {
    color.disabled = false;
  }
});
