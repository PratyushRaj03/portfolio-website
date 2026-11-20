/* ==========================================================================
   THEMED CONTEXT MENU (RIGHT-CLICK) CONTROLLER
   Matches the portfolio's cyberpunk/amber-gold design with smooth glassmorphism.
   ========================================================================== */

export function initContextMenu() {
  // Prevent duplicate initialization
  if (document.getElementById('custom-context-menu')) return;

  // 1. Build and inject context menu DOM
  const menu = document.createElement('div');
  menu.id = 'custom-context-menu';
  menu.className = 'custom-context-menu';
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-hidden', 'true');

  menu.innerHTML = `
    <div class="context-menu-accent-line"></div>

    <div class="context-menu-header">
      <div class="context-menu-title">
        <span class="status-dot"></span>
        <span>Pratyush Raj</span>
      </div>
      <span class="context-menu-badge">AI / ML</span>
    </div>

    <!-- Dynamic Section: Shown only when user selects text -->
    <div class="context-menu-section" id="context-selection-section" style="display: none;">
      <button class="context-menu-item" data-action="copy-selection">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="context-menu-text">Copy Selected Text</span>
        <span class="context-menu-shortcut">Ctrl+C</span>
      </button>
      <div class="context-menu-divider"></div>
    </div>

    <!-- Quick Navigation -->
    <div class="context-menu-section">
      <div class="context-menu-label">Navigate</div>
      <button class="context-menu-item" data-action="nav-projects">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
        <span class="context-menu-text">Featured Projects</span>
        <span class="context-menu-shortcut">#work</span>
      </button>
      <button class="context-menu-item" data-action="nav-skills">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span class="context-menu-text">Skills & Tech Stack</span>
        <span class="context-menu-shortcut">#skills</span>
      </button>
      <button class="context-menu-item" data-action="nav-experience">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span class="context-menu-text">Experience Timeline</span>
        <span class="context-menu-shortcut">#exp</span>
      </button>
      <button class="context-menu-item" data-action="nav-contact">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span class="context-menu-text">Get in Touch</span>
        <span class="context-menu-shortcut">#contact</span>
      </button>
    </div>

    <div class="context-menu-divider"></div>

    <!-- Actions & Profiles -->
    <div class="context-menu-section">
      <div class="context-menu-label">Actions</div>
      <button class="context-menu-item" data-action="copy-link">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        <span class="context-menu-text">Copy Portfolio URL</span>
      </button>
      <button class="context-menu-item" data-action="copy-email">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span class="context-menu-text">Copy Email</span>
      </button>
      <button class="context-menu-item" data-action="open-github">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
        <span class="context-menu-text">GitHub Profile</span>
        <span class="context-menu-shortcut">↗</span>
      </button>
      <button class="context-menu-item" data-action="toggle-particles">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="M4.93 4.93l1.41 1.41"></path>
          <path d="M17.66 17.66l1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="M6.34 17.66l-1.41 1.41"></path>
          <path d="M19.07 4.93l-1.41 1.41"></path>
        </svg>
        <span class="context-menu-text">Particle Mesh</span>
        <span class="context-menu-shortcut" id="particles-status-pill">On</span>
      </button>
    </div>

    <div class="context-menu-divider"></div>

    <!-- Page Controls -->
    <div class="context-menu-section">
      <button class="context-menu-item" data-action="reload-page">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        <span class="context-menu-text">Reload Page</span>
        <span class="context-menu-shortcut">Ctrl+R</span>
      </button>
      <button class="context-menu-item" data-action="scroll-top">
        <svg class="context-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
        <span class="context-menu-text">Scroll to Top</span>
        <span class="context-menu-shortcut">Alt+↑</span>
      </button>
    </div>
  `;

  document.body.appendChild(menu);

  // 2. Build and inject toast element
  const toast = document.createElement('div');
  toast.id = 'context-menu-toast';
  toast.className = 'context-menu-toast';
  toast.innerHTML = `
    <svg class="context-menu-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span id="context-menu-toast-text">Action completed</span>
  `;
  document.body.appendChild(toast);

  let toastTimeout = null;
  function showToast(message) {
    const toastText = document.getElementById('context-menu-toast-text');
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // 3. Helper to close context menu
  function closeContextMenu() {
    menu.classList.remove('active');
    menu.setAttribute('aria-hidden', 'true');
  }

  // 4. Position and show context menu
  let selectedTextCache = '';

  window.addEventListener('contextmenu', (e) => {
    // If Shift is pressed, allow developer/native context menu
    if (e.shiftKey) return;

    e.preventDefault();

    // Check if user selected text
    const selection = window.getSelection().toString().trim();
    const selectionSection = document.getElementById('context-selection-section');
    if (selection) {
      selectedTextCache = selection;
      selectionSection.style.display = 'block';
    } else {
      selectedTextCache = '';
      selectionSection.style.display = 'none';
    }

    // Show menu off-screen first to compute dimensions
    menu.style.visibility = 'hidden';
    menu.style.display = 'block';
    menu.classList.add('active');

    const menuRect = menu.getBoundingClientRect();
    const menuWidth = menuRect.width || 250;
    const menuHeight = menuRect.height || 360;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let posX = e.clientX;
    let posY = e.clientY;

    // Boundary protection: Flip horizontally if near right viewport edge
    if (posX + menuWidth > viewportWidth - 12) {
      posX = Math.max(12, posX - menuWidth);
    }

    // Boundary protection: Flip vertically if near bottom viewport edge
    if (posY + menuHeight > viewportHeight - 12) {
      posY = Math.max(12, posY - menuHeight);
    }

    menu.style.left = `${posX}px`;
    menu.style.top = `${posY}px`;
    menu.style.visibility = 'visible';
    menu.setAttribute('aria-hidden', 'false');

    // Make sure custom cursor listeners recognize new interactive buttons
    if (typeof window.refreshCursorListeners === 'function') {
      window.refreshCursorListeners();
    }
  });

  // 5. Handle Menu Item Click Actions
  menu.addEventListener('click', (e) => {
    const item = e.target.closest('.context-menu-item');
    if (!item) return;

    const action = item.getAttribute('data-action');
    closeContextMenu();

    switch (action) {
      case 'copy-selection':
        if (selectedTextCache) {
          navigator.clipboard.writeText(selectedTextCache).then(() => {
            showToast('Selected text copied to clipboard!');
          }).catch(() => {
            showToast('Failed to copy text.');
          });
        }
        break;

      case 'nav-hero':
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'nav-projects':
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'nav-skills':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'nav-experience':
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'nav-contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;

      case 'copy-link':
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Portfolio link copied to clipboard!');
        }).catch(() => {
          showToast('Failed to copy link.');
        });
        break;

      case 'copy-email':
        navigator.clipboard.writeText('pratyush.sceem@gmail.com').then(() => {
          showToast('Email (pratyush.sceem@gmail.com) copied!');
        }).catch(() => {
          showToast('Failed to copy email.');
        });
        break;

      case 'open-github':
        window.open('https://github.com/PratyushRaj03', '_blank', 'noopener,noreferrer');
        break;

      case 'toggle-particles': {
        const container = document.getElementById('canvas-container');
        const pill = document.getElementById('particles-status-pill');
        if (container) {
          if (container.style.opacity === '0') {
            container.style.opacity = '1';
            if (pill) pill.textContent = 'On';
            showToast('Particle mesh activated');
          } else {
            container.style.opacity = '0';
            if (pill) pill.textContent = 'Off';
            showToast('Particle mesh paused');
          }
        }
        break;
      }

      case 'reload-page':
        window.location.reload();
        break;

      case 'scroll-top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
    }
  });

  // 6. Close events: click outside, escape key, scroll, resize
  window.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      closeContextMenu();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContextMenu();
    }
  });

  window.addEventListener('scroll', () => {
    closeContextMenu();
  }, { passive: true });

  window.addEventListener('resize', () => {
    closeContextMenu();
  }, { passive: true });
}
