/* CUSTOM CURSOR & MAGNETIC HOVER SYSTEM */

export function initCursor() {
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (!cursorDot || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  let currentDotX = mouseX;
  let currentDotY = mouseY;
  let currentRingX = mouseX;
  let currentRingY = mouseY;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor follow with requestAnimationFrame (interpolation)
  function updateCursor() {
    // Instant dot movement
    currentDotX += (mouseX - currentDotX) * 0.35;
    currentDotY += (mouseY - currentDotY) * 0.35;
    cursorDot.style.transform = `translate3d(${currentDotX}px, ${currentDotY}px, 0) translate(-50%, -50%)`;

    // Lagging ring movement (lower multiplier = more lag)
    currentRingX += (mouseX - currentRingX) * 0.12;
    currentRingY += (mouseY - currentRingY) * 0.12;
    cursorRing.style.transform = `translate3d(${currentRingX}px, ${currentRingY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover animations triggers
  const interactiveSelector = 'a, button, input, textarea, .tech-badge, .timeline-dot, .skills-card, .project-preview-container';
  
  function attachHoverListeners() {
    const interactives = document.querySelectorAll(interactiveSelector);
    
    interactives.forEach(el => {
      // Avoid duplicate event listener bindings
      if (el.dataset.hasCursorListeners) return;
      el.dataset.hasCursorListeners = 'true';

      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering-interactive');
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering-interactive');
      });
    });
  }

  // Initial attachment
  attachHoverListeners();

  // Expose function to re-attach after dynamic content injections
  window.refreshCursorListeners = attachHoverListeners;

  // MAGNETIC HOVER EFFECT FOR BUTTONS
  const magneticElements = document.querySelectorAll('.btn, .social-btn, .logo');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const bound = el.getBoundingClientRect();
      const elX = bound.left + bound.width / 2;
      const elY = bound.top + bound.height / 2;

      // Mouse distance from item center
      const diffX = e.clientX - elX;
      const diffY = e.clientY - elY;

      // Restrict pull distance to 12px max
      const pullX = diffX * 0.3;
      const pullY = diffY * 0.3;

      el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      el.style.transition = 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}
