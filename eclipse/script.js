document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     👇 SECCIÓN PERSONALIZABLE: AQUÍ EDITAS TU MENSAJE
  ========================================================== */

  const miTitulo = "Mi casualidad favorita";

  // Puedes escribir párrafos con saltos de línea (\n\n)
  const miMensaje = "sabias que el eclipse ocurre cuando se cruzan dos almas celestes en el universo o cuando dios quiere meter la cuchara.\n\npero bueno este proyecto lo empecé el dia del eclipse y recien lo termino queria que lo vieras porque es para vos, te amo aunque me hagas enojar teamoyo :)";

  const miCierre = "Con mucho amor ajsjaj";

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