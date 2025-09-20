document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified || '—';

const apiKey = 'c39235c9933321a0dc756b1326364ed3';
const lat = 40.7128;
const lon = -74.0060;

async function loadWeather() {
  if (!apiKey || apiKey === 'TU_API_KEY_AQUI') {
    document.getElementById('desc').textContent = 'Introduce tu API key en el script.';
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener datos del clima');
    const data = await res.json();

    const current = data.list[0];
    document.getElementById('temp').textContent = Math.round(current.main.temp) + " °C";
    document.getElementById('desc').textContent = current.weather[0].description;

    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    const byDay = {};
    data.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' });
      const hour = date.getHours();
      if (hour === 12 && !byDay[day]) {
        byDay[day] = item;
      }
    });

    Object.values(byDay).slice(0, 3).forEach(d => {
      const date = new Date(d.dt_txt);
      const li = document.createElement('li');
      li.textContent = `${date.toLocaleDateString('es-ES', { weekday: 'long', month: 'short', day: 'numeric' })} — ${Math.round(d.main.temp)} °C — ${d.weather[0].description}`;
      forecastList.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    document.getElementById('desc').textContent = 'No se pudo cargar el clima.';
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function loadSpotlights() {
  try {
    const res = await fetch('data/newMembers.json');
    if (!res.ok) throw new Error('No se pudo cargar members.json — asegúrate de usar Live Server');
    const members = await res.json();

    const destacados = members.filter(m => /gold|silver/i.test(m.membership));
    const elegidos = shuffleArray(destacados).slice(0, Math.min(3, destacados.length));

    const cont = document.getElementById('spotlight-cards');
    cont.innerHTML = '';

    elegidos.forEach(m => {
      const card = document.createElement('div');
      card.className = 'member-card';
      card.innerHTML = `
        <img src="${m.logo}" alt="Logo ${m.companyName}">
        <h3>${m.companyName}</h3>
        <p>${m.address || ''}</p>
        <p>${m.phone || ''}</p>
        <p><a href="${m.website}" target="_blank" rel="noopener">Sitio web</a></p>
        <p><strong>Membership:</strong> ${m.membership}</p>
      `;
      cont.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    document.getElementById('spotlight-cards').textContent = 'No se pudieron cargar los spotlights.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadWeather();
  loadSpotlights();
});
