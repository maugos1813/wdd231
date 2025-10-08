import { openModal } from './modal.js';

async function fetchProjects() {
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error('Failed to load data');
    const projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error('Fetch error:', error);
    document.querySelector('#projects').innerHTML = '<p>Error loading projects.</p>';
  }
}

function displayProjects(projects) {
  const container = document.querySelector('#projects');
  container.innerHTML = projects.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <button class="btn" data-title="${p.title}" data-tech="${p.tech}" data-url="${p.url}">View Details</button>
    </div>
  `).join('');

  document.querySelectorAll('.card button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const { title, tech, url } = e.target.dataset;
      openModal(title, tech, url);
    });
  });
}

fetchProjects();
