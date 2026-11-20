/* 3D PERSPECTIVE CARD TILT & SPOTLIGHT CONTROLLER */

export function init3DTilts() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    // Configurable tilt bounds
    const maxTilt = card.dataset.maxTilt ? parseFloat(card.dataset.maxTilt) : 10;
    const scale = card.dataset.scale ? parseFloat(card.dataset.scale) : 1.02;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to element bounds
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Map to values from -0.5 to 0.5
      const xc = mouseX / width - 0.5;
      const yc = mouseY / height - 0.5;

      // Calculate rotations (rotation around Y-axis is driven by horizontal mouse delta, and X-axis rotation by vertical delta)
      const rotY = xc * maxTilt;
      const rotX = -yc * maxTilt;

      // Apply transformations
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      card.style.transition = 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s';

      // Set CSS variables for spotlights
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);
    });

    card.addEventListener('mouseleave', () => {
      // Smoothly return card back to flat state
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s';
    });
  });

  // Dynamic Parallax Mouse Tracking for Hero profile container
  const heroWrapper = document.querySelector('.profile-art-wrapper');
  if (heroWrapper) {
    const avatar = heroWrapper.querySelector('.profile-avatar-img');
    const tags = heroWrapper.querySelectorAll('.glass-tag');
    const glow = heroWrapper.querySelector('.profile-art-glow');

    window.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const hwX = rect.left + rect.width / 2;
      const hwY = rect.top + rect.height / 2;

      // Viewport offsets
      const diffX = e.clientX - hwX;
      const diffY = e.clientY - hwY;

      // Map offset limits
      const rotY = (diffX / window.innerWidth) * 20;
      const rotX = -(diffY / window.innerHeight) * 20;

      heroWrapper.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      heroWrapper.style.transition = 'transform 0.1s ease-out';

      // Parallax layer depths (translateZ properties shift perspective based on mouse location)
      if (avatar) {
        avatar.style.transform = `translateZ(40px) translate3d(${diffX * 0.03}px, ${diffY * 0.03}px, 0)`;
      }

      if (glow) {
        glow.style.transform = `translateZ(-20px) translate3d(${-diffX * 0.05}px, ${-diffY * 0.05}px, 0)`;
      }

      tags.forEach(tag => {
        const factor = tag.classList.contains('tag-ai') ? 0.07 : 
                       tag.classList.contains('tag-cv') ? 0.09 : 0.05;
        const zVal = tag.classList.contains('tag-ai') ? 60 : 
                     tag.classList.contains('tag-cv') ? 80 : 50;

        tag.style.transform = `translateZ(${zVal}px) translate3d(${diffX * factor}px, ${diffY * factor}px, 0)`;
      });
    });

    heroWrapper.addEventListener('mouseleave', () => {
      heroWrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
      heroWrapper.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      
      if (avatar) {
        avatar.style.transform = 'translateZ(40px) translate3d(0, 0, 0)';
        avatar.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      }

      tags.forEach(tag => {
        const zVal = tag.classList.contains('tag-ai') ? 60 : 
                     tag.classList.contains('tag-cv') ? 80 : 50;
        tag.style.transform = `translateZ(${zVal}px) translate3d(0, 0, 0)`;
        tag.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }
}
export function initSingleTilt(element) {
  // Utility function to bind tilt on a single element (e.g. dynamically generated cards)
  const maxTilt = element.dataset.maxTilt ? parseFloat(element.dataset.maxTilt) : 10;
  const scale = element.dataset.scale ? parseFloat(element.dataset.scale) : 1.02;

  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xc = mouseX / width - 0.5;
    const yc = mouseY / height - 0.5;

    const rotY = xc * maxTilt;
    const rotX = -yc * maxTilt;

    element.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    element.style.transition = 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s';

    element.style.setProperty('--mouse-x', `${mouseX}px`);
    element.style.setProperty('--mouse-y', `${mouseY}px`);
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s';
  });
}
