// Objeto para armazenar as funções de inicialização de cada seção const sectionInitializers = {};

// === Lógica de Inicialização para a SEÇÃO 1 === sectionInitializers.initSection1 = function() { const sloganMain = document.querySelector('.hero-section-1 .slogan-main'); const sloganSub = document.querySelector('.hero-section-1 .slogan-sub'); const btn = document.querySelector('.hero-section-1 .btn'); const videoBackground = document.getElementById('video-background-1'); const heroContent = document.querySelector('.hero-section-1 .hero-content');

if (videoBackground.dataset.initialized === 'true') { console.log('Seção 1: Vídeo e animações já inicializados. Ignorando.'); return; } videoBackground.dataset.initialized = 'true'; // Função para tentar tocar o vídeo const tryPlayVideo = () => { videoBackground.play().catch(e => { console.warn('Seção 1: Falha ao tocar vídeo automaticamente:', e); }); }; // Inicia animação de texto const startTextAnimation = () => { sloganMain.classList.add('animate-fade-in-down'); sloganSub.classList.add('animate-fade-in-up'); btn.classList.add('animate-fade-in'); }; videoBackground.addEventListener('canplay', () => { console.log('Seção 1: Vídeo pronto para reprodução.'); tryPlayVideo(); setTimeout(startTextAnimation, 500); }); if (videoBackground.readyState >= 2) { console.log('Seção 1: Vídeo já pronto (readyState >= 2).'); tryPlayVideo(); setTimeout(startTextAnimation, 500); } else { videoBackground.load(); console.log('Seção 1: Vídeo não pronto, chamando load().'); } // Forçar recarregamento se o vídeo não estiver tocando após 2 segundos setTimeout(() => { if (videoBackground.paused) { console.log('Recarregando vídeo da seção 1...'); videoBackground.load(); videoBackground.play().catch(e => console.log('Ainda não pode tocar:', e)); } }, 2000); 

};

// === Lógica de Inicialização para a SEÇÃO 2 === sectionInitializers.initSection2 = function() { const textContainer = document.getElementById('scene-container-2');

if (textContainer.dataset.initialized === 'true') { console.log('Seção 2: Já inicializado.'); return; } textContainer.dataset.initialized = 'true'; // Aqui você pode adicionar lógica de animação com Three.js ou outra biblioteca console.log('Seção 2: Inicializando cena '); 

};

// === Lógica de Inicialização para a SEÇÃO 3 === sectionInitializers.initSection3 = function() { const videoBackground = document.getElementById('videoBackground3'); const slogan1 = document.getElementById('slogan1'); const slogan2 = document.getElementById('slogan2');

if (videoBackground.dataset.initialized === 'true') return; videoBackground.dataset.initialized = 'true'; videoBackground.play().catch(e => console.warn('Seção 3: Falha ao tocar vídeo:', e)); slogan1.classList.add('animate-fade-in-down'); setTimeout(() => slogan2.classList.add('animate-fade-in-up'), 500); 

};

// === Lógica de Inicialização para a SEÇÃO 4 === sectionInitializers.initSection4 = function() { const title = document.getElementById('animated-title'); const button = document.getElementById('section4-button');

if (title.dataset.initialized === 'true') return; title.dataset.initialized = 'true'; title.textContent = 'Octahedron Precision'; title.classList.add('animate-fade-in'); button.classList.add('animate-fade-in'); 

};

// === Lógica de Inicialização para a SEÇÃO 5 === sectionInitializers.initSection5 = function() { const content1 = document.getElementById('firstTakeContent'); const content2 = document.getElementById('secondTakeContent');

if (content1.dataset.initialized === 'true') return; content1.dataset.initialized = 'true'; setTimeout(() => content2.style.display = 'block', 5000); 

};

// Listener de scroll para disparar inicializações window.addEventListener('scroll', () => { const section1 = document.getElementById('section1'); const section2 = document.getElementById('section2'); const section3 = document.getElementById('section3'); const section4 = document.getElementById('section4'); const section5 = document.getElementById('section5');

if (section1 && section1.getBoundingClientRect().top < window.innerHeight) { sectionInitializers.initSection1(); section1.classList.add('section-visible'); } if (section2 && section2.getBoundingClientRect().top < window.innerHeight) { sectionInitializers.initSection2(); section2.classList.add('section-visible'); } if (section3 && section3.getBoundingClientRect().top < window.innerHeight) { sectionInitializers.initSection3(); section3.classList.add('section-visible'); } if (section4 && section4.getBoundingClientRect().top < window.innerHeight) { sectionInitializers.initSection4(); section4.classList.add('section-visible'); } if (section5 && section5.getBoundingClientRect().top < window.innerHeight) { sectionInitializers.initSection5(); section5.classList.add('section-visible'); } 

});

// Adicionar um listener de clique global para tentar iniciar vídeos em navegadores restritivos document.body.addEventListener('click', function globalVideoPlayAttempt() { const videos = document.querySelectorAll('video'); videos.forEach(video => { if (video.paused) { video.play().then(() => { console.log('Global click: Vídeo iniciado com sucesso após interação do usuário.', video.id); }).catch(e => { console.warn('Global click: Falha ao iniciar vídeo mesmo com interação:', video.id, e); }); } }); }, { once: true }); // Tenta fazer isso uma única vez para não poluir

