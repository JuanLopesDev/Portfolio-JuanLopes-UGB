// Marca que o JS está ativo (o CSS só esconde as seções para animar se isso existir)
document.documentElement.classList.add('js');

// 1) Efeito de digitação no cargo
(function () {
  const alvo = document.querySelector('.type-target');
  if (!alvo) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const texto = alvo.textContent.trim();
  alvo.textContent = '';
  let i = 0;

  function digitar() {
    alvo.textContent = texto.slice(0, i);
    i++;
    if (i <= texto.length) setTimeout(digitar, 35);
  }
  digitar();
})();

// 2) Seções aparecem suavemente ao rolar a página
(function () {
  const itens = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    itens.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  itens.forEach(el => obs.observe(el));
})();

// 3) Destaca no menu a seção que está na tela
(function () {
  const links = document.querySelectorAll('.navigation__links a');
  const secoes = [...links]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function atualizar() {
    const y = window.scrollY + 120;
    let atual = null;
    secoes.forEach(s => { if (s.offsetTop <= y) atual = s.id; });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + atual);
    });
  }
  window.addEventListener('scroll', atualizar, { passive: true });
  atualizar();
})();