document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.md-nav__toggle');
  for (const toggle of toggles) {
    toggle.checked = true; // keep all navigation branches expanded
  }
});
