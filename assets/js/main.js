/* MAIN BOOTSTRAPPING ENGINE */

import { projectsData, skillsData, timelineData } from './data.js';
import { initCursor } from './cursor.js';
import { initCanvasBackground } from './canvas-bg.js';
import { init3DTilts, initSingleTilt } from './tilt.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Global Cinematic Foundations
  initCanvasBackground();
  initCursor();

  // 2. Render Page Components from data layer
  renderProjects();
  renderSkills();
  renderTimeline();

  // 3. Bind tilt states to loaded elements
  init3DTilts();

  // 4. Register Typing effect, scroll reveals, stats counters
  initTypingEffect();
  initScrollObserver();
  initContactForm();
  initHeaderScroll();
  initMobileMenu();

  // 5. Deactivate Loading Screen Overlay
  fadeLoadingOverlay();
});

/* FADE OUT LOADING SYSTEM */
function fadeLoadingOverlay() {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        loader.remove();
      }, 600);
    }, 800); // Faint delay to show premium initial landing
  }
}

/* NAVIGATION SCROLL SHRINK & BLUR FILTER */
function initHeaderScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* MOBILE TOGGLE MENU */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
    toggle.classList.toggle('active');

    // Animate hamburger to X
    const spans = toggle.querySelectorAll('span');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when links are clicked
  links.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', () => {
      links.classList.remove('active');
      toggle.classList.remove('active');
      toggle.querySelectorAll('span').forEach(s => s.style.transform = 'none');
      toggle.querySelectorAll('span')[1].style.opacity = '1';
    });
  });
}

/* RENDER PROJECTS */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projectsData.map((project, idx) => {
    // Generate specialized canvas or vector container visualizer inside project frames
    let visualizerContent = '';

    if (project.id === 'project-outlet-nav') {
      visualizerContent = `
        <div class="vector-visualizer visualizer-outlet-nav">
          <div class="map-grid-overlay"></div>
          <svg class="map-routes-svg" viewBox="0 0 400 280">
            <path d="M20,150 Q100,120 180,160 T350,130" stroke="rgba(255,255,255,0.07)" stroke-width="5" fill="none"/>
            <path d="M120,20 Q160,110 200,180 T280,270" stroke="rgba(255,255,255,0.07)" stroke-width="4" fill="none"/>
            <path d="M40,250 C120,200 240,210 380,70" stroke="rgba(255,255,255,0.05)" stroke-width="4" fill="none"/>
            <path class="active-gps-line" d="M65,200 L125,160 L205,165 L285,110 L335,70" fill="none" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path class="active-gps-pulse" d="M65,200 L125,160 L205,165 L285,110 L335,70" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="8 14"/>
          </svg>
          <div class="map-pin pin-user" style="top: 192px; left: 57px;" title="Current Location">
            <span class="user-pulse"></span>
            <span class="user-dot"></span>
          </div>
          <div class="map-pin pin-dest" style="top: 60px; left: 327px;" title="Destination Outlet">
            <span class="target-radar"></span>
            <div class="pin-badge">OUTLET #4092</div>
          </div>
          <div class="map-pin pin-cluster pin-gold" style="top: 75px; left: 105px;"><span>38</span></div>
          <div class="map-pin pin-cluster pin-cyan" style="top: 140px; left: 235px;"><span>142</span></div>
          <div class="map-pin pin-cluster pin-purple" style="top: 35px; left: 215px;"><span>65</span></div>
          <div class="map-pin pin-cluster pin-emerald" style="top: 205px; left: 265px;"><span>91</span></div>
          <div class="map-pin pin-dot pin-gold" style="top: 120px; left: 165px;"></div>
          <div class="map-pin pin-dot pin-purple" style="top: 175px; left: 135px;"></div>
          <div class="nav-hud-card">
            <div class="nav-hud-header">
              <span class="nav-live-dot"></span>
              <span class="nav-hud-title">ACTIVE ROAD ROUTING</span>
              <span class="nav-tag-live">4,000+ OUTLETS</span>
            </div>
            <div class="nav-hud-body">
              <div class="nav-turn-icon">↱</div>
              <div class="nav-hud-info">
                <span class="nav-instruction">Turn Right in 250m • Main Ave</span>
                <div class="nav-hud-metrics">
                  <span class="nav-metric">ETA: <strong>14 min</strong></span>
                  <span class="nav-metric-divider">•</span>
                  <span class="nav-metric">Dist: <strong>5.2 km</strong></span>
                  <span class="nav-metric-divider">•</span>
                  <span class="nav-status">Traffic: Normal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (project.id === 'project-bottle-detection') {
      visualizerContent = `
        <div class="vector-visualizer visualizer-bottle-detection">
          <div class="detection-scanline"></div>
          <div class="detection-grid-overlay"></div>
          <div class="cv-reticle reticle-tl"></div>
          <div class="cv-reticle reticle-tr"></div>
          <div class="cv-reticle reticle-bl"></div>
          <div class="cv-reticle reticle-br"></div>
          <div class="detection-scene">
            <div class="bottle-entity bottle-1">
              <div class="bottle-shape bottle-glass"></div>
              <div class="bbox bbox-gold">
                <div class="bbox-label"><span class="label-class">bottle_glass</span> <span class="label-conf">98.4%</span></div>
                <div class="bbox-coords">[x:72 y:55 w:68 h:170]</div>
              </div>
            </div>
            <div class="bottle-entity bottle-2">
              <div class="bottle-shape bottle-plastic"></div>
              <div class="bbox bbox-cyan">
                <div class="bbox-label"><span class="label-class">bottle_plastic</span> <span class="label-conf">96.2%</span></div>
                <div class="bbox-coords">[x:170 y:80 w:62 h:145]</div>
              </div>
            </div>
            <div class="bottle-entity bottle-3">
              <div class="bottle-shape bottle-can"></div>
              <div class="bbox bbox-purple">
                <div class="bbox-label"><span class="label-class">bottle_can</span> <span class="label-conf">93.8%</span></div>
                <div class="bbox-coords">[x:260 y:110 w:54 h:115]</div>
              </div>
            </div>
          </div>
          <div class="cv-telemetry-bar">
            <span class="cv-telemetry-item"><span class="cv-key">MODEL:</span> YOLOv8</span>
            <span class="cv-telemetry-item"><span class="cv-key">mAP@0.5:</span> 94.6%</span>
            <span class="cv-telemetry-item"><span class="cv-key">LATENCY:</span> 12.4ms</span>
            <span class="cv-telemetry-item"><span class="cv-key">STATUS:</span> INFERENCE_READY</span>
          </div>
        </div>
      `;
    }

    const techBadges = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
    
    const featuresHtml = project.features ? `
      <ul class="project-features-list">
        ${project.features.map(f => `
          <li class="project-feature-item">
            <span class="project-feature-bullet">✦</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
    ` : '';

    const calloutHtml = project.calloutText ? `
      <div class="project-callout-box">
        <div class="project-callout-title">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          ${project.calloutTitle || 'Engineering Focus'}
        </div>
        <div>${project.calloutText}</div>
      </div>
    ` : '';

    return `
      <div class="project-card-wrapper reveal">
        <div class="tilt-card-wrapper">
          <div class="project-preview-container tilt-card spotlight-card border-glow-card" data-max-tilt="5">
            ${visualizerContent}
          </div>
        </div>
        <div class="project-details">
          <h3 class="project-title">${project.title}</h3>
          <h4 class="project-subtitle">${project.subtitle}</h4>
          <p class="project-description">${project.description}</p>
          ${featuresHtml}
          ${calloutHtml}
          <div class="project-tech">
            ${techBadges}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* RENDER SKILLS */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const categories = {
    cv: { title: "Computer Vision", icon: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>` },
    ml: { title: "Deep Learning & ML", icon: `<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path><path d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line>` },
    frontend: { title: "Frontend & Geospatial", icon: `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>` },
    backend: { title: "Backend & Systems", icon: `<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>` },
    databases: { title: "Databases & Datasets", icon: `<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>` },
    tools: { title: "Tools & DevOps", icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>` }
  };

  let cardsHtml = '';

  for (const [key, category] of Object.entries(categories)) {
    const list = skillsData[key] || [];
    if (list.length === 0) continue;

    // Check if SVG needs fill or stroke
    const svgContent = category.customPath ?
      `<svg viewBox="0 0 24 24">${category.icon}</svg>` :
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${category.icon}</svg>`;

    const listHtml = list.map(item => `
      <li class="skill-item">
        <div class="skill-info">
          <span class="skill-name">${item.name}</span>
        </div>
      </li>
    `).join('');

    cardsHtml += `
      <div class="tilt-card-wrapper reveal">
        <div class="skills-card tilt-card spotlight-card" data-max-tilt="8">
          <div class="skills-card-bg-glow"></div>
          <div class="skills-card-header">
            <div class="skills-card-icon">
              ${svgContent}
            </div>
            <h3 class="skills-card-title">${category.title}</h3>
          </div>
          <ul class="skills-list">
            ${listHtml}
          </ul>
        </div>
      </div>
    `;
  }

  container.innerHTML = cardsHtml;
}

/* RENDER TIMELINE */
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = timelineData.map(node => {
    // Pick vector icon according to event categories
    let iconSvg = '';
    if (node.type === 'work') {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
    } else if (node.type === 'education') {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`;
    } else if (node.type === 'achievement') {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    }

    const badgesHtml = node.badges.map(b => `<span class="timeline-badge">${b}</span>`).join('');

    return `
      <div class="timeline-item reveal">
        <div class="timeline-dot">
          ${iconSvg}
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-title">${node.title}</h3>
              <h4 class="timeline-org">${node.organization}</h4>
            </div>
            <span class="timeline-year">${node.year}</span>
          </div>
          <p class="timeline-desc">${node.description}</p>
          <div class="timeline-badges">
            ${badgesHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* TYPING LOOP EFFECT */
function initTypingEffect() {
  const element = document.querySelector('.typing-text');
  if (!element) return;

  const words = [
    "Computer Vision Engineer.",
    "Full Stack Developer.",
    "Backend Engineer.",
    "AI Application Developer."
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      delay = 50; // Deletes faster
    } else {
      charIndex++;
      delay = 100; // Normal typing speed
    }

    element.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000; // Hold at the end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 500; // Buffer before starting next word
    }

    setTimeout(type, delay);
  }

  type();
}

/* LAZY INTERSECTION SCROLL OBSERVER */
function initScrollObserver() {
  // 1. Reveal hidden blocks
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Animate progress skill bars on viewport enter
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.dataset.level;
        fill.style.width = `${level}%`;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // 3. Trigger Stats numbers count-up
  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }
}

/* STATS INTERPOLATING COUNT-UP */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  const duration = 1800; // Total ms to complete animation

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quad ease-out formulation
      const easeOutQuad = progress * (2 - progress);
      const val = Math.floor(easeOutQuad * target);

      counter.textContent = val.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(update);
  });
}

/* SECURE ELEGANT CONTACT SUBMIT MOCKER */
/* SECURE CONTACT FORM WITH EMAILJS */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form || !status) return;

  // Add EmailJS script to head if not already loaded
  if (!document.querySelector('script[src*="emailjs"]')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS with your public key
      emailjs.init('J1HThLskjwpJswspf'); // Replace with your actual public key
    };
    document.head.appendChild(script);
  } else {
    // If already loaded, just initialize
    if (typeof emailjs !== 'undefined') {
      emailjs.init('J1HThLskjwpJswspf');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate
    if (!name || !email || !message) {
      status.className = 'form-status error';
      status.textContent = 'Please fill in all fields.';
      status.style.opacity = '1';
      return;
    }

    // Show sending state
    const submitBtn = form.querySelector('button[type="submit"]');
    const origBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    status.className = 'form-status';
    status.textContent = 'Encrypting transmission...';
    status.style.opacity = '1';

    try {
      // Wait for EmailJS to load if needed
      if (typeof emailjs === 'undefined') {
        await new Promise((resolve) => {
          const checkEmailJS = setInterval(() => {
            if (typeof emailjs !== 'undefined') {
              clearInterval(checkEmailJS);
              emailjs.init('J1HThLskjwpJswspf');
              resolve();
            }
          }, 100);
        });
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_8kzl8m7',     // Replace with your Service ID
        'template_8onrznk',    // Replace with your Template ID
        {
          name: name,
          email: email,
          message: message,
          to_email: 'pratyush.sceem@gmail.com' // Your Gmail
        }
      );

      // Success
      status.className = 'form-status success';
      status.textContent = '✅ Message sent! I will reach out to you shortly.';
      status.style.opacity = '1';

      form.reset();

      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnText;

      // Auto-hide success message after 6 seconds
      setTimeout(() => {
        status.style.opacity = '0';
        setTimeout(() => {
          status.textContent = '';
          status.className = 'form-status';
        }, 500);
      }, 6000);

    } catch (error) {
      console.error('EmailJS error:', error);

      // Error handling
      status.className = 'form-status error';
      status.textContent = '❌ Failed to send. Please try again or email me directly.';
      status.style.opacity = '1';

      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnText;

      // Auto-hide error after 6 seconds
      setTimeout(() => {
        status.style.opacity = '0';
      }, 6000);
    }
  });
}
