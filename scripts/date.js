document.addEventListener("DOMContentLoaded", function () {
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
      lastModifiedEl.textContent = "Last modification: " + document.lastModified;
    }
  });