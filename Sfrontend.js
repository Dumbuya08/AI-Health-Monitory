document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme in localStorage
  if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-theme');
  }

  themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');

      // Save theme preference to localStorage
      if (body.classList.contains('dark-theme')) {
          localStorage.setItem('theme', 'dark');
      } else {
          localStorage.setItem('theme', 'light');
      }
  });
});

  
  