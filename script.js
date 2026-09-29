// ---------- Theme toggle ----------
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    iconSun.style.display = theme === 'dark' ? 'none' : 'block';
    iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
  }

  const saved = localStorage.getItem('lankarides-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('lankarides-theme', next);
  });
})();

// ---------- Mobile nav ----------
(function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => nav.classList.remove('is-open'))
  );
})();

// ---------- Service filter ----------
(function () {
  const bar = document.getElementById('filterBar');
  const cards = document.querySelectorAll('.service-card');
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
})();

// ---------- Booking form ----------
(function () {
  const form = document.getElementById('bookingForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());

    // No backend wired up yet — this is where you'd POST to your API, e.g.:
    // fetch('/api/bookings', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
    console.log('Booking submitted:', data);

    note.textContent = `Thanks, ${data.name.split(' ')[0]}! We've received your booking request and will email you at ${data.email} to confirm.`;
    note.style.color = 'var(--teal)';
    form.reset();
  });
})();

// ---------- Header shadow on scroll ----------
(function () {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 8 ? '0 8px 20px -18px rgba(0,0,0,.4)' : 'none';
  });
})();