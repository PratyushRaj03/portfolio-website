/* CANVAS ANIMATED CONSTELLATION MESH BACKGROUND */

export function initCanvasBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas-bg';
  const container = document.getElementById('canvas-container');
  if (!container) return;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  // Adjust particle count depending on device screen width
  function getParticleCount() {
    if (width < 768) return 40;
    if (width < 1200) return 80;
    return 130;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.baseRadius = Math.random() * 1.5 + 0.5;
      this.radius = this.baseRadius;
      this.color = 'rgba(255, 255, 255, 0.2)';
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Boundaries check
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse repulsion math
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          // Repel speed force
          this.x += Math.cos(angle) * force * 1.5;
          this.y += Math.sin(angle) * force * 1.5;
        }
      }

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // Bootstrap particles list
  function setup() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  // Draw linking paths
  function drawConnections() {
    const maxDistance = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          // Opacity fades as distance increases
          const opacity = (1 - dist / maxDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  // Listeners
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    setup();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  setup();
  animate();
}
