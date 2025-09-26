
document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) ts.value = new Date().toISOString();

  const modals = document.querySelectorAll('.modal');
  const buttons = document.querySelectorAll('.card button');
  const closes = document.querySelectorAll('.modal .close');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.parentElement.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'flex';
    });
  });

  closes.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navUl = document.querySelector('nav ul');
  if (navToggle && navUl) {
    navToggle.addEventListener('click', () => navUl.classList.toggle('open'));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
});
