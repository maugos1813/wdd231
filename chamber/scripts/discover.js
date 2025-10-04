document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".discover-container");
    const visitMessage = document.querySelector("#visit-message");
  
    const toggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("nav ul");
  
    if (toggle && navMenu) {
      toggle.addEventListener("click", () => navMenu.classList.toggle("open"));
    }
  
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
      if (link.href === window.location.href) link.classList.add("active");
      else link.classList.remove("active");
    });
  
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();
  
    if (lastVisit) {
      const daysPassed = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysPassed === 0) visitMessage.textContent = "¡Bienvenido de nuevo! Hoy mismo visitaste la página 👋";
      else if (daysPassed === 1) visitMessage.textContent = "¡Gracias por volver! Han pasado 1 día desde tu última visita.";
      else visitMessage.textContent = `Han pasado ${daysPassed} días desde tu última visita.`;
    } else {
      visitMessage.textContent = "¡Bienvenido por primera vez! 🎉";
    }
  
    localStorage.setItem("lastVisit", currentVisit);
  
    async function loadDiscoverData() {
      try {
        const response = await fetch("data/discover.json");
        if (!response.ok) throw new Error("No se pudo cargar discover.json");
        const data = await response.json();
        localStorage.setItem("discoverData", JSON.stringify(data.places)); 
        displayDiscoverCards(data.places);
      } catch (error) {
        console.error(error);
        if (container) container.innerHTML = "<p>Error al cargar los lugares. Intenta más tarde.</p>";
      }
    }
  
    function displayDiscoverCards(places) {
      if (!container) return;
      container.innerHTML = "";
  
      places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
  
        if (window.innerWidth >= 768) {
          card.style.gridArea = `card${index+1}`;
        } else {
          card.style.gridArea = ""; 
        }
  
        card.innerHTML = `
          <img src="${place.image}" alt="${place.name}" loading="lazy">
          <h3>${place.name}</h3>
          <p>${place.address}</p>
          <p>${place.description}</p>
          <button class="learn-more">Learn More</button>
        `;
  
        container.appendChild(card);
      });
    }
  
    window.addEventListener('resize', () => {
      const storedPlaces = JSON.parse(localStorage.getItem('discoverData') || '[]');
      displayDiscoverCards(storedPlaces);
    });
  
    loadDiscoverData();
  
    document.querySelector("#year").textContent = new Date().getFullYear();
    document.querySelector("#lastModified").textContent = document.lastModified;
  });
  