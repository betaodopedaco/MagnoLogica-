// Rolar suavemente até a seção "serviços"
document.querySelector('.scroll-button').addEventListener('click', function(e) {
  e.preventDefault();
  const servicos = document.getElementById('servicos');
  if (servicos) {
    servicos.scrollIntoView({ behavior: 'smooth' });
  }
});

// Animação de entrada do texto principal
document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('.hero-content h1');
  if (h1) {
    h1.style.opacity = '0';
    h1.style.transform = 'translateY(40px)';
    setTimeout(() => {
      h1.style.transition = 'all 1s ease';
      h1.style.opacity = '1';
      h1.style.transform = 'translateY(0)';
    }, 100);
  }
});
