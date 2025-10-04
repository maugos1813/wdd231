document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".discover-container");
    const visitMessage = document.querySelector("#visit-message");
  
    const toggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("nav ul");
  
    if (toggle && navMenu) {
      toggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });
    }
  
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();
  
    if (lastVisit) {
      const daysPassed = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysPassed === 0) {
        visitMessage.textContent = "¡Bienvenido de nuevo! Hoy mismo visitaste la página 👋";
      } else if (daysPassed === 1) {
        visitMessage.textContent = "¡Gracias por volver! Han pasado 1 día desde tu última visita.";
      } else {
        visitMessage.textContent = `Han pasado ${daysPassed} días desde tu última visita.`;
      }
    } else {
      visitMessage.textContent = "¡Bienvenido por primera vez! 🎉";
    }
  
    localStorage.setItem("lastVisit", currentVisit);
  
    async function loadDiscoverData() {
      try {
        const response = await fetch("data/discover.json");
        const data = await response.json();
        displayDiscoverCards(data.places);
      } catch (error) {
        console.error("Error al cargar discover.json:", error);
      }
    }
  
    function displayDiscoverCards(places) {
      container.innerHTML = "";
      places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
  
        card.innerHTML = `
          <img src="${place.image}" alt="${place.name}">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        `;
  
        container.appendChild(card);
      });
    }
  
    loadDiscoverData();
  
    document.querySelector("#year").textContent = new Date().getFullYear();
    document.querySelector("#lastModified").textContent = document.lastModified;
  });
  