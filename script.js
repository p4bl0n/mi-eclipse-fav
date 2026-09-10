document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     👇 SECCIÓN PERSONALIZABLE: AQUÍ EDITAS TU MENSAJE
  ========================================================== */

  const miTitulo = ":)";

  // Puedes escribir párrafos con saltos de línea (\n\n)
  const miMensaje = "este mensaje es para despedirme de vos seguramente vayas a entrar de nuevo a verlo aunque lo borre del chat, estoy demasiado enojado y no queria que terminaran las cosas asi al final termine sospechando de algo que si era como yo pensaba, no sabes como deseaba estar equivocado y desconfiar en vano. \n\nmentiras y mentiras, mientras mas lo pienso mas cosas me suenan a mentira, que terrible que me siento por que no hayas tenido la confianza de contarme las cosas como eran en realidad y que hayas tenido que recurrir a mentirme para segun vos complacerme y estar bien conmigo cuando termino siendo lo contrario, pero bueno espero te haya servido la leccion para aprender que no es la manera correcta de hacer las cosas ni de actuar con quien supuestamente queres pasar el resto de tus dias, con quien te gusta compartir y estar en todos los sentidos, siento una catarata de emociones, no se si te odio poruqe te amo tanto que un poc de enojo parece insignificante, pero tambien sufri TANTO TANTO por vos que mi lado egoista me dice que no tengo que sufrir asi por nadie, hiciste cosas que nunca hubiera aceptado de nadie, pero es como dicen. uno no elige de quien enamorarse y bueno me siento re mil lastimado pero ya fue. ojala te haya quedado claro que yo siempre quise lo mejor para vos y que no merecia todas las cosas que me hiciste, un perdon no va a solucionar nada asi que realmente espero que me pidas perdon de la forma mas sana posible, cambiando todas esas actitudes y demostrandome que de verdad si podes ser diferente que si podes ser mejor persona y ahi seguramente vos seas apta para todo mi amor y yo lo sea para el tuyo, cuando rectifiques y realmente cambies y mejores como persona yo voy a estar en la vereda de enfrente esperandote con los brazos abiertos dispuesto a escucharte y ayudarte con todo";

  const miCierre = "mensaje de despedida. Te amo :) 9/9/2026";

  /* ========================================================== */

  const startBtn = document.getElementById('startBtn');
  const orbitStage = document.getElementById('orbitStage');
  const loveCard = document.getElementById('loveCard');
  const headerHint = document.getElementById('headerHint');
  const bgMusic = document.getElementById('bgMusic');
  const sky = document.getElementById('sky');
  const shootingStarsBox = document.getElementById('shootingStarsBox');
  const cardTitle = document.getElementById('cardTitle');
  const typewriterText = document.getElementById('typewriterText');
  const cursor = document.getElementById('cursor');
  const cardClosing = document.getElementById('cardClosing');

  let isEclipsed = false;
  let shootingStarsInterval;

  // 1. Crear cielo con estrellas de fondo
  function populateStars(count = 95) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 2.5 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      star.style.animationDuration = `${(Math.random() * 2 + 2.5).toFixed(2)}s`;

      sky.appendChild(star);
    }
  }

  // 2. Generador de estrellas fugaces realistas
  function spawnShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    // Origen aleatorio en la parte superior derecha de la pantalla
    const startX = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.2);
    const startY = Math.random() * (window.innerHeight * 0.4);
    const length = Math.random() * 120 + 80;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;
    star.style.width = `${length}px`;

    shootingStarsBox.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 2200);
  }

  function startShootingStarsStorm() {
    // Primera ráfaga inmediata
    spawnShootingStar();
    // Lanzar una nueva estrella fugaz cada 1.2 a 2.5 segundos de forma continua
    shootingStarsInterval = setInterval(() => {
      spawnShootingStar();
    }, 1800);
  }

  // 3. Audio con desvanecimiento de volumen progresivo (Fade In)
  function playMusicGradually() {
    if (!bgMusic) return;
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      let vol = 0;
      const fader = setInterval(() => {
        if (vol < 0.7) {
          vol += 0.05;
          bgMusic.volume = Math.min(vol, 1);
        } else {
          clearInterval(fader);
        }
      }, 300);
    }).catch(err => {
      console.log("Esperando interacción táctil:", err);
    });
  }

  // 4. Efecto máquina de escribir (Typewriter) letra por letra
  function typeWriterEffect(text, element, speed = 45) {
    let index = 0;
    element.innerHTML = '';

    function writeChar() {
      if (index < text.length) {
        const char = text.charAt(index);
        
        // Interpretar saltos de línea para el HTML
        if (char === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += char;
        }

        index++;
        setTimeout(writeChar, speed);
      } else {
        // Al terminar de escribir, ocultar el cursor parpadeante y mostrar la firma
        if (cursor) cursor.style.display = 'none';
        cardClosing.textContent = miCierre;
        cardClosing.classList.add('visible');
      }
    }

    writeChar();
  }

  // 5. Disparar secuencia total al interactuar
  function startExperience() {
    if (isEclipsed) return;
    isEclipsed = true;

    // Desvanecer controles iniciales
    startBtn.style.opacity = '0';
    startBtn.style.pointerEvents = 'none';
    headerHint.style.opacity = '0';

    // Iniciar canción
    playMusicGradually();

    // Activar eclipse lento (5 segundos de transición)
    orbitStage.classList.add('eclipsed');

    // Empezar el desfile de estrellas fugaces
    startShootingStarsStorm();

    // Cuando la luna se alinea por completo (~4.5 segundos)
    setTimeout(() => {
      loveCard.classList.add('revealed');
      
      // Mostrar título
      cardTitle.textContent = miTitulo;
      cardTitle.classList.add('visible');

      // Empezar a redactar el mensaje en tiempo real
      setTimeout(() => {
        typeWriterEffect(miMensaje, typewriterText, 45);
      }, 700);

    }, 4500);
  }

  startBtn.addEventListener('click', startExperience);

  // 6. Destellos táctiles interactivos en celular
  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('#startBtn')) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'touch-sparkle';
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  });

  populateStars();
});