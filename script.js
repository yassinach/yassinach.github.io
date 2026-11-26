// ---------- Language (FR is the main language, EN on demand) ----------
const META = {
  fr: {
    title: 'Yassin Achefri — Cybersécurité · SOC · DevSecOps',
    description: "Yassin Achefri, élève-ingénieur en Réseaux Intelligents et Cybersécurité à l'ENSA Khouribga. SOC et détection, automatisation SOAR, DevSecOps et réseaux. Recherche d'un stage PFE de 6 mois en 2027."
  },
  en: {
    title: 'Yassin Achefri — Cybersecurity · SOC · DevSecOps',
    description: 'Yassin Achefri, cybersecurity engineering student at ENSA Khouribga. SOC and detection, SOAR automation, DevSecOps and networking. Looking for a 6-month internship in 2027.'
  }
};

function setLang(lang, save) {
  document.documentElement.lang = lang;
  document.title = META[lang].title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', META[lang].description);
  document.querySelectorAll('[data-alt-' + lang + ']').forEach(el => el.setAttribute('alt', el.dataset['alt' + lang[0].toUpperCase() + lang.slice(1)]));
  const toggle = document.getElementById('langToggle');
  toggle?.setAttribute('aria-label', toggle.dataset['label' + lang[0].toUpperCase() + lang.slice(1)]);
  if (save) {
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage unavailable: language still switches */ }
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  }
}

setLang(document.documentElement.lang === 'en' ? 'en' : 'fr', false);
document.getElementById('langToggle')?.addEventListener('click', () => {
  setLang(document.documentElement.lang === 'en' ? 'fr' : 'en', true);
});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

function closeMenu() {
  nav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ---------- Reveal on scroll ----------
const revealTargets = document.querySelectorAll('.section-head, .skill-card, .project, .timeline-item, .education-card, .cert, .contact-panel');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
