// main.js - lógica de interações, vídeos e animações 3D

// Mapeamento de inicializadores por seção
const inits = {
  section1: initSection1,
  section2: initSection2,
  section3: initSection3,
  section4: initSection4,
  section5: initSection5
};

// IntersectionObserver genérico para revelar seções
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      entry.target.classList.add('section-visible');
      inits[id]?.();
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

// Observa todas as seções full-height
document.querySelectorAll('.full-height-section').forEach(sec => observer.observe(sec));

// Seção 1: Vídeo de fundo e slogans animados
function initSection1() {
  const vid = document.getElementById('video-background-1');
  if (vid.dataset.inited) return;
  vid.dataset.inited = true;

  const slogans = [...document.querySelectorAll('.slogan-main, .slogan-sub, .btn')];
  vid.addEventListener('loadeddata', () => {
    vid.play().catch(() => {});
    vid.classList.add('visible');
    slogans.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 500));
  });
  vid.load();
}

// Seção 2: Texto animado e globo 3D
function initSection2() {
  const txt = document.getElementById('neoTexto');
  const container = document.getElementById('scene-container-2');
  if (container.dataset.inited) return;
  container.dataset.inited = true;

  // Revela texto
  setTimeout(() => txt.classList.add('revealed'), 300);

  // Setup Three.js: globo wireframe
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  cam.position.z = 3;

  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 3),
    new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true })
  );
  scene.add(globe);
  scene.add(new THREE.AmbientLight(0x888888));
  const point = new THREE.PointLight(0xffffff, 1);
  point.position.set(5, 5, 5);
  scene.add(point);

  function animate() {
    globe.rotation.y += 0.003;
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
  }
  animate();

  // Responsividade
  window.addEventListener('resize', debounce(() => {
    cam.aspect = container.clientWidth / container.clientHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }, 200));
}

// Seção 3: Vídeo + swap de slogans
function initSection3() {
  const vid = document.getElementById('videoBackground3');
  if (vid.dataset.inited) return;
  vid.dataset.inited = true;

  const slogans = [
    document.getElementById('slogan1'),
    document.getElementById('slogan2'),
    document.querySelector('.botao')
  ];
  vid.addEventListener('loadeddata', () => {
    vid.play().catch(() => {});
    vid.classList.add('visible');
    slogans.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 600));
  });
  vid.load();
}

// Seção 4: Octaedros 3D + texto estático
function initSection4() {
  const container = document.getElementById('bg-canvas-4');
  if (container.dataset.inited) return;
  container.dataset.inited = true;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  cam.position.z = 4;

  // Cria vários octaedros
  const group = new THREE.Group();
  for (let i = 0; i < 30; i++) {
    const geo = new THREE.OctahedronGeometry(0.3, 0);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6
    );
    group.add(mesh);
  }
  scene.add(group);
  scene.add(new THREE.AmbientLight(0x555555));
  const pl = new THREE.PointLight(0xffffff, 1);
  pl.position.set(10, 10, 10);
  scene.add(pl);

  function animate() {
    group.rotation.x += 0.002;
    group.rotation.y += 0.002;
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', debounce(() => {
    cam.aspect = container.clientWidth / container.clientHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }, 200));
}

// Seção 5: Alternância de takes e overlay de transição
function initSection5() {
  const vid = document.getElementById('bgVideo5');
  if (vid.dataset.inited) return;
  vid.dataset.inited = true;

  const overlay = document.getElementById('transitionOverlay5');
  const first = document.getElementById('firstTakeContent');
  const second = document.getElementById('secondTakeContent');

  vid.play().catch(() => {});
  vid.classList.add('visible');

  setTimeout(() => overlay.classList.add('active'), 2000);
  setTimeout(() => {
    overlay.classList.remove('active');
    first.style.display = 'none';
    second.style.display = 'block';
  }, 3500);
}

// Função debounce
function debounce(fn, ms = 100) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, ms);
  };
                                          }
