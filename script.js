// js/script.js

// Objeto para armazenar as funções de inicialização de cada seção
const sectionInitializers = {}; [span_488](start_span)/*[span_488](end_span) */

// === Lógica de Inicialização para a SEÇÃO 1 (CORRIGIDA) ===
sectionInitializers.initSection1 = function() {
    const sloganMain = document.querySelector('.hero-section-1 .slogan-main'); [span_489](start_span)/*[span_489](end_span) */
    const sloganSub = document.querySelector('.hero-section-1 .slogan-sub'); [span_490](start_span)/*[span_490](end_span) */
    const btn = document.querySelector('.hero-section-1 .btn'); [span_491](start_span)/*[span_491](end_span) */
    const videoBackground = document.getElementById('video-background-1'); [span_492](start_span)/*[span_492](end_span) */
    const heroContent = document.querySelector('.hero-section-1 .hero-content'); [span_493](start_span)/*[span_493](end_span) */

    if (videoBackground.dataset.initialized === 'true') {
        console.log('Seção 1: Vídeo e animações já inicializados. Ignorando.'); [span_494](start_span)/*[span_494](end_span) */
        return;
    }
    videoBackground.dataset.initialized = 'true'; [span_495](start_span)/*[span_495](end_span) */
    // Marca como inicializada
    console.log('Seção 1: Iniciando inicialização...'); [span_496](start_span)/*[span_496](end_span) */

    // Função para mostrar o botão de fallback
    const showFallbackButton = () => {
        // Verifica se já existe um botão
        if (document.getElementById('fallback-button-section1')) return; [span_497](start_span)/*[span_497](end_span) */

        const fallbackButton = document.createElement('button'); [span_498](start_span)/*[span_498](end_span) */
        fallbackButton.id = 'fallback-button-section1'; [span_499](start_span)/*[span_499](end_span) */
        fallbackButton.className = 'video-fallback-button'; [span_500](start_span)/*[span_500](end_span) */
        fallbackButton.textContent = 'Tocar Vídeo'; [span_501](start_span)/*[span_501](end_span) */
        fallbackButton.onclick = () => {
            videoBackground.play().then(() => {
                fallbackButton.style.display = 'none';
            }).catch(e => {
                [span_502](start_span)console.error('Ainda não foi possível tocar o vídeo:', e); /*[span_502](end_span) */
            });
        };
        heroContent.appendChild(fallbackButton); [span_503](start_span)/*[span_503](end_span) */
    };

    // Função para iniciar as animações de texto
    const startTextAnimations = () => {
        if (sloganMain && sloganMain.dataset.animated !== 'true') {
            console.log('Seção 1: Iniciando animações de texto.'); [span_504](start_span)/*[span_504](end_span) */
            sloganMain.style.animation = 'textAscend 2.5s ease-out forwards'; [span_505](start_span)/*[span_505](end_span) */
            sloganSub.style.animation = 'fadeIn 1.5s ease-out 2s forwards'; [span_506](start_span)/*[span_506](end_span) */
            btn.style.animation = 'fadeIn 1.5s ease-out 2.8s forwards'; [span_507](start_span)/*[span_507](end_span) */
            sloganMain.dataset.animated = 'true'; [span_508](start_span)/*[span_508](end_span) */
        }
    };

    const tryPlayVideo = () => {
        console.log('Seção 1: Tentando tocar vídeo...'); [span_509](start_span)/*[span_509](end_span) */
        videoBackground.play().then(() => {
            [span_510](start_span)console.log('Seção 1: Vídeo tocando com sucesso.'); /*[span_510](end_span) */
            // Esconde o botão de fallback se existir
            const fallbackButton = document.getElementById('fallback-button-section1'); [span_511](start_span)/*[span_511](end_span) */
            if (fallbackButton) {
                fallbackButton.style.display = 'none'; [span_512](start_span)/*[span_512](end_span) */
            }
        }).catch(error => {
            [span_513](start_span)console.warn('Seção 1: Erro ou bloqueio de autoplay:', error); /*[span_513](end_span) */
            // Mostra o botão de fallback
            showFallbackButton(); [span_514](start_span)/*[span_514](end_span) */
        });
    };

    // Inicia as animações de texto independentemente do vídeo
    startTextAnimations(); [span_515](start_span)/*[span_515](end_span) */

    // Evento para quando o vídeo estiver pronto para tocar dados suficientes para o início
    videoBackground.addEventListener('loadeddata', () => {
        [span_516](start_span)console.log('Seção 1: Evento loadeddata disparado.'); /*[span_516](end_span) */
        tryPlayVideo(); [span_517](start_span)/*[span_517](end_span) */
    }, { once: true }); [span_518](start_span)/*[span_518](end_span) */

    // Se o vídeo já estiver pronto (ex: cache do navegador ou carregamento rápido)
    if (videoBackground.readyState >= 2) { // HAVE_CURRENT_DATA
        console.log('Seção 1: Vídeo já pronto (readyState >= 2).'); [span_519](start_span)/*[span_519](end_span) */
        tryPlayVideo(); [span_520](start_span)/*[span_520](end_span) */
    } else {
        videoBackground.load(); // Garante que o vídeo comece a carregar se ainda não o fez
        console.log('Seção 1: Vídeo não pronto, chamando load().'); [span_521](start_span)/*[span_521](end_span) */
    }

    // Forçar recarregamento se o vídeo não estiver tocando após 2 segundos
    setTimeout(() => {
        if (videoBackground.paused) {
            [span_522](start_span)console.log('Recarregando vídeo da seção 1...'); /*[span_522](end_span) */
            videoBackground.load(); [span_523](start_span)/*[span_523](end_span) */
            videoBackground.play().catch(e => console.log('Ainda não pode tocar:', e)); [span_524](start_span)/*[span_524](end_span) */
        }
    }, 2000); [span_525](start_span)/*[span_525](end_span) */
};

// === Lógica de Inicialização para a SEÇÃO 2: Globo 3D ===
sectionInitializers.initSection2 = function() {
    const texto = document.getElementById('neoTexto'); [span_526](start_span)/*[span_526](end_span) */
    const sceneContainer = document.getElementById('scene-container-2'); [span_527](start_span)/*[span_527](end_span) */
    if (sceneContainer.dataset.initialized === 'true') { return; [span_528](start_span)} /*[span_528](end_span) */
    sceneContainer.dataset.initialized = 'true'; [span_529](start_span)/*[span_529](end_span) */

    texto.classList.add('revealed'); [span_530](start_span)/*[span_530](end_span) */
    // Ativa a animação do texto imediatamente

    // THREE.JS GLOBO
    const scene = new THREE.Scene(); [span_531](start_span)/*[span_531](end_span) */
    const camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000); [span_532](start_span)/*[span_532](end_span) */
    camera.position.z = 4.5; [span_533](start_span)/*[span_533](end_span) */

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); [span_534](start_span)/*[span_534](end_span) */
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight); [span_535](start_span)/*[span_535](end_span) */

    if (!sceneContainer.querySelector('canvas')) {
        sceneContainer.appendChild(renderer.domElement); [span_536](start_span)/*[span_536](end_span) */
    }

    const geometry = new THREE.IcosahedronGeometry(2.3, 2); [span_537](start_span)/*[span_537](end_span) */
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: true, shininess: 80 }); [span_538](start_span)/*[span_538](end_span) */
    const globe = new THREE.Mesh(geometry, material); [span_539](start_span)/*[span_539](end_span) */
    scene.add(globe); [span_540](start_span)/*[span_540](end_span) */

    // Adicionar luzes
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2); // white light
    directionalLight1.position.set(5, 5, 5).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x00ffff, 1); // cyan light
    directionalLight2.position.set(-5, -5, -5).normalize();
    scene.add(directionalLight2);

    // Adicionar partículas de fundo
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.7 });
    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Render loop
    const animate = () => {
        requestAnimationFrame(animate);

        globe.rotation.x += 0.0005;
        globe.rotation.y += 0.001;
        stars.rotation.y += 0.0002;
        stars.rotation.x += 0.0001;

        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
        camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);
};

// === Lógica de Inicialização para a SEÇÃO 3 (CORRIGIDA) ===
sectionInitializers.initSection3 = function() {
    const videoBackground = document.getElementById('videoBackground3'); [span_541](start_span)/*[span_541](end_span) */
    const slogan1 = document.getElementById('slogan1'); [span_542](start_span)/*[span_542](end_span) */
    const slogan2 = document.getElementById('slogan2'); [span_543](start_span)/*[span_543](end_span) */
    const buttonContainer = document.getElementById('button-container'); [span_544](start_span)/*[span_544](end_span) */
    const section3Content = document.getElementById('section3-content'); [span_545](start_span)/*[span_545](end_span) */

    if (videoBackground.dataset.initialized === 'true') {
        console.log('Seção 3: Vídeo e animações já inicializados. Ignorando.'); [span_546](start_span)/*[span_546](end_span) */
        return;
    }
    videoBackground.dataset.initialized = 'true'; [span_547](start_span)/*[span_547](end_span) */
    console.log('Seção 3: Iniciando inicialização...'); [span_548](start_span)/*[span_548](end_span) */

    const startAnimations = () => {
        console.log('Seção 3: Iniciando animações de conteúdo.'); [span_549](start_span)/*[span_549](end_span) */
        section3Content.style.opacity = '1'; [span_550](start_span)/*[span_550](end_span) */
        slogan1.style.transform = 'translateY(0)'; [span_551](start_span)/*[span_551](end_span) */
        slogan1.style.opacity = '1'; [span_552](start_span)/*[span_552](end_span) */
        slogan2.style.transitionDelay = '0.3s'; [span_553](start_span)/*[span_553](end_span) */
        slogan2.style.transform = 'translateY(0)'; [span_554](start_span)/*[span_554](end_span) */
        slogan2.style.opacity = '1'; [span_555](start_span)/*[span_555](end_span) */
        buttonContainer.style.transitionDelay = '0.6s'; [span_556](start_span)/*[span_556](end_span) */
        buttonContainer.style.transform = 'translateY(0)'; [span_557](start_span)/*[span_557](end_span) */
        buttonContainer.style.opacity = '1'; [span_558](start_span)/*[span_558](end_span) */
        videoBackground.style.opacity = '1'; [span_559](start_span)/*[span_559](end_span) */
        videoBackground.style.transform = 'scale(1)'; [span_560](start_span)/*[span_560](end_span) */
    };

    const tryPlayVideo = () => {
        console.log('Seção 3: Tentando tocar vídeo...'); [span_561](start_span)/*[span_561](end_span) */
        videoBackground.play().then(() => {
            [span_562](start_span)console.log('Seção 3: Vídeo tocando com sucesso.'); /*[span_562](end_span) */
            startAnimations(); [span_563](start_span)/*[span_563](end_span) */
        }).catch(error => {
            [span_564](start_span)console.warn('Seção 3: Erro ou bloqueio de autoplay, mostrando conteúdo sem vídeo:', error); /*[span_564](end_span) */
            // Fallback: se o vídeo não tocar, ainda assim mostre o conteúdo
            startAnimations(); [span_565](start_span)/*[span_565](end_span) */
        });
    };

    videoBackground.addEventListener('loadeddata', () => {
        [span_566](start_span)console.log('Seção 3: Evento loadeddata disparado.'); /*[span_566](end_span) */
        tryPlayVideo(); [span_567](start_span)/*[span_567](end_span) */
    }, { once: true }); [span_568](start_span)/*[span_568](end_span) */

    if (videoBackground.readyState >= 2) { // HAVE_CURRENT_DATA
        console.log('Seção 3: Vídeo já pronto (readyState >= 2).'); [span_569](start_span)/*[span_569](end_span) */
        tryPlayVideo(); [span_570](start_span)/*[span_570](end_span) */
    } else {
        videoBackground.load(); // Garante que o vídeo comece a carregar se ainda não o fez
        console.log('Seção 3: Vídeo não pronto, chamando load().'); [span_571](start_span)/*[span_571](end_span) */
    }

    setTimeout(() => {
        if (videoBackground.paused) {
            [span_572](start_span)console.log('Recarregando vídeo da seção 3...'); /*[span_572](end_span) */
            videoBackground.load(); [span_573](start_span)/*[span_573](end_span) */
            videoBackground.play().catch(e => console.log('Ainda não pode tocar:', e)); [span_574](start_span)/*[span_574](end_span) */
        }
    }, 2000); [span_575](start_span)/*[span_575](end_span) */
};


// === Lógica de Inicialização para a SEÇÃO 4: Octahedrons 3D ===
sectionInitializers.initSection4 = function() {
    const canvas = document.getElementById('bg-canvas-4'); [span_576](start_span)/*[span_576](end_span) */
    const animatedTitle = document.getElementById('animated-title'); [span_577](start_span)/*[span_577](end_span) */
    const section4Subtitle = document.getElementById('section4-subtitle'); [span_578](start_span)/*[span_578](end_span) */
    const section4Button = document.getElementById('section4-button'); [span_579](start_span)/*[span_579](end_span) */

    if (canvas.dataset.initialized === 'true') {
        console.log('Seção 4: Canvas e animações já inicializados. Ignorando.'); [span_580](start_span)/*[span_580](end_span) */
        return;
    }
    canvas.dataset.initialized = 'true'; [span_581](start_span)/*[span_581](end_span) */
    console.log('Seção 4: Iniciando inicialização...'); [span_582](start_span)/*[span_582](end_span) */

    // THREE.JS SCENE
    const scene = new THREE.Scene(); [span_583](start_span)/*[span_583](end_span) */
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000); [span_584](start_span)/*[span_584](end_span) */
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); [span_585](start_span)/*[span_585](end_span) */
    renderer.setSize(canvas.clientWidth, canvas.clientHeight); [span_586](start_span)/*[span_586](end_span) */

    // Resize handler
    const onWindowResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight; [span_587](start_span)/*[span_587](end_span) */
        camera.updateProjectionMatrix(); [span_588](start_span)/*[span_588](end_span) */
        renderer.setSize(canvas.clientWidth, canvas.clientHeight); [span_589](start_span)/*[span_589](end_span) */
    };
    window.addEventListener('resize', onWindowResize); [span_590](start_span)/*[span_590](end_span) */

    // OCTAHEDRONS
    const octahedrons = [];
    const numOctahedrons = 50;
    const colors = [0x00ffff, 0x8a2be2, 0xff00ff, 0x00ff00, 0xffff00]; // Cyan, BlueViolet, Magenta, Lime, Yellow

    for (let i = 0; i < numOctahedrons; i++) {
        const geometry = new THREE.OctahedronGeometry(Math.random() * 0.5 + 0.1, 0);
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.5 + Math.random() * 0.5 // Varied opacity
        });
        const octahedron = new THREE.Mesh(geometry, material);

        octahedron.position.x = (Math.random() - 0.5) * 10;
        octahedron.position.y = (Math.random() - 0.5) * 10;
        octahedron.position.z = (Math.random() - 0.5) * 10 - 5; // Push some back
        scene.add(octahedron);
        octahedrons.push(octahedron);
    }

    camera.position.z = 2; // Closer to see octahedrons

    // ANIMATION LOOP
    const animate = () => {
        requestAnimationFrame(animate);

        octahedrons.forEach(oct => {
            oct.rotation.x += 0.005 + Math.random() * 0.002;
            oct.rotation.y += 0.005 + Math.random() * 0.002;
            oct.position.z += 0.01; // Move towards camera
            if (oct.position.z > camera.position.z + 2) { // Reset if too close
                oct.position.z = (Math.random() - 0.5) * 10 - 5;
            }
        });

        renderer.render(scene, camera);
    };
    animate();

    // TEXT ANIMATION
    const text = "MagnoLogica: Visão que transcende o convencional."; [span_591](start_span)/*[span_591](end_span) */
    animatedTitle.innerHTML = text.split('').map((char, i) => {
        [span_592](start_span)return `<span style="--i:${i};">${char === ' ' ? '&nbsp;' : char}</span>`; /*[span_592](end_span) */
    }).join(''); [span_593](start_span)/*[span_593](end_span) */

    // Add a class to trigger the animation
    setTimeout(() => {
        [span_594](start_span)animatedTitle.style.opacity = 1; /*[span_594](end_span) */
        section4Subtitle.style.opacity = 1; [span_595](start_span)/*[span_595](end_span) */
        section4Button.style.opacity = 1; [span_596](start_span)/*[span_596](end_span) */
    }, 500); // Small delay to ensure render
};

// === Lógica de Inicialização para a SEÇÃO 5 (Dois Takes) ===
sectionInitializers.initSection5 = function() {
    const bgVideo = document.getElementById('bgVideo5'); [span_597](start_span)/*[span_597](end_span) */
    const firstTakeContent = document.getElementById('firstTakeContent'); [span_598](start_span)/*[span_598](end_span) */
    const secondTakeContent = document.getElementById('secondTakeContent'); [span_599](start_span)/*[span_599](end_span) */
    const transitionOverlay = document.getElementById('transitionOverlay5'); [span_600](start_span)/*[span_600](end_span) */

    if (bgVideo.dataset.initialized === 'true') {
        console.log('Seção 5: Vídeo e animações já inicializados. Ignorando.'); [span_601](start_span)/*[span_601](end_span) */
        return;
    }
    bgVideo.dataset.initialized = 'true'; [span_602](start_span)/*[span_602](end_span) */
    console.log('Seção 5: Iniciando inicialização...'); [span_603](start_span)/*[span_603](end_span) */

    const showFirstTake = () => {
        bgVideo.style.opacity = '1'; [span_604](start_span)/*[span_604](end_span) */
        firstTakeContent.classList.add('visible'); [span_605](start_span)/*[span_605](end_span) */
        secondTakeContent.classList.remove('visible'); [span_606](start_span)/*[span_606](end_span) */
    };

    const showSecondTake = () => {
        transitionOverlay.classList.add('active'); [span_607](start_span)/*[span_607](end_span) */
        setTimeout(() => {
            [span_608](start_span)firstTakeContent.classList.remove('visible'); /*[span_608](end_span) */
            secondTakeContent.classList.add('visible'); [span_609](start_span)/*[span_609](end_span) */
            transitionOverlay.classList.remove('active'); [span_610](start_span)/*[span_610](end_span) */
        }, 1500); // Matches transition duration
    };

    // Initial play attempt
    const tryPlayVideo = () => {
        bgVideo.play().then(() => {
            [span_611](start_span)console.log('Seção 5: Vídeo tocando com sucesso.'); /*[span_611](end_span) */
            showFirstTake(); [span_612](start_span)/*[span_612](end_span) */
        }).catch(error => {
            [span_613](start_span)console.warn('Seção 5: Erro ou bloqueio de autoplay:', error); /*[span_613](end_span) */
            // Fallback: If video can't autoplay, just show content
            showFirstTake(); [span_614](start_span)/*[span_614](end_span) */
        });
    };

    bgVideo.addEventListener('loadeddata', () => {
        [span_615](start_span)console.log('Seção 5: Evento loadeddata disparado.'); /*[span_615](end_span) */
        tryPlayVideo(); [span_616](start_span)/*[span_616](end_span) */
    }, { once: true }); [span_617](start_span)/*[span_617](end_span) */

    if (bgVideo.readyState >= 2) { // HAVE_CURRENT_DATA
        console.log('Seção 5: Vídeo já pronto (readyState >= 2).'); [span_618](start_span)/*[span_618](end_span) */
        tryPlayVideo(); [span_619](start_span)/*[span_619](end_span) */
    } else {
        bgVideo.load(); // Ensure video starts loading
        console.log('Seção 5: Vídeo não pronto, chamando load().'); [span_620](start_span)/*[span_620](end_span) */
    }

    // Example of when to switch takes (you'd integrate this with your scroll logic)
    // For demonstration, let's switch after 10 seconds.
    setTimeout(() => {
        console.log('Seção 5: Acionando segundo take...');
        showSecondTake();
    }, 10000); // After 10 seconds, switch to the second take (adjust as needed)


    // Intersection Observer to trigger section animations when visible
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                console.log(`Seção ${sectionId} visível. Tentando inicializar.`);
                switch (sectionId) {
                    case 'section1':
                        [span_621](start_span)sectionInitializers.initSection1(); /*[span_621](end_span) */
                        break;
                    case 'section2':
                        sectionInitializers.initSection2(); [span_622](start_span)/*[span_622](end_span) */
                        break;
                    case 'section3':
                        sectionInitializers.initSection3(); [span_623](start_span)/*[span_623](end_span) */
                        break;
                    case 'section4':
                        sectionInitializers.initSection4(); [span_624](start_span)/*[span_624](end_span) */
                        break;
                    case 'section5':
                        sectionInitializers.initSection5(); [span_625](start_span)/*[span_625](end_span) */
                        break;
                    default:
                        break;
                }
                entry.target.classList.add('section-visible'); [span_626](start_span)/*[span_626](end_span) */
                // If you only want the animation to run once, uncomment the line below:
                // observer.unobserve(entry.target);
            } else {
                 entry.target.classList.remove('section-visible'); [span_627](start_span)/*[span_627](end_span) */
            }
        });
    }, observerOptions);

    // Observe each section
    document.querySelectorAll('.full-height-section').forEach(section => {
        [span_628](start_span)observer.observe(section); /*[span_628](end_span) */
    });


    // Chama a inicialização da primeira seção assim que o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        [span_629](start_span)console.log('DOM Content Loaded. Iniciando Seção 1.'); /*[span_629](end_span) */
        // A inicialização da seção 1 será disparada pelo IntersectionObserver quando ela estiver visível
        // mas mantemos essa chamada caso ela já esteja visível na carga inicial.
        const section1 = document.getElementById('section1'); [span_630](start_span)/*[span_630](end_span) */
        if (section1 && section1.getBoundingClientRect().top < window.innerHeight) {
            sectionInitializers.initSection1(); [span_631](start_span)/*[span_631](end_span) */
            section1.classList.add('section-visible'); [span_632](start_span)/*[span_632](end_span) */
        }
    });

    // Adicionar um listener de clique global para tentar iniciar vídeos em navegadores restritivos
    document.body.addEventListener('click', function globalVideoPlayAttempt() {
        [span_633](start_span)const videos = document.querySelectorAll('video'); /*[span_633](end_span) */
        videos.forEach(video => {
            if (video.paused) {
                video.play().then(() => {
                    [span_634](start_span)console.log('Global click: Vídeo iniciado com sucesso após interação do usuário.', video.id); /*[span_634](end_span) */
                }).catch(e => {
                    [span_635](start_span)console.warn('Global click: Falha ao iniciar vídeo mesmo com interação:', video.id, e); /*[span_635](end_span) */
                });
            }
        });
    }, { once: true }); [span_636](start_span)/*[span_636](end_span) */
    // Tenta fazer isso uma única vez para não poluir
};
