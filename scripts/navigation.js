document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
  
    function setNav(open) {
      navToggle.setAttribute("aria-expanded", String(open));
      primaryNav.dataset.visible = open ? "true" : "false";
      primaryNav.style.display = open ? "block" : "";
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    }
  
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      setNav(!expanded);
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNav(false);
    });
  
    primaryNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") setNav(false);
    });
  });