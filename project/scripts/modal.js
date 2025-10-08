export function openModal(title, tech, url) {
    const modal = document.querySelector('#modal');
    const body = document.querySelector('#modalBody');
    body.innerHTML = `
      <h3>${title}</h3>
      <p><b>Technologies:</b> ${tech}</p>
      <a href="${url}" target="_blank">Visit Project</a>
    `;
    modal.classList.remove('hidden');
  }
  
  document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('#modal').classList.add('hidden');
  });
  