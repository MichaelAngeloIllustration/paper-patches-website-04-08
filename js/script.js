/* OPEN MENU */

const menu = document.getElementById("main-navigation");
const button = document.querySelector(".menu-toggle");

button.addEventListener("click", () => {

  menu.classList.toggle("show");
  button.classList.toggle("active");

});

// Reset menu state on desktop resize
function handleResize() {
  if (window.innerWidth >= 1080) {
    menu.classList.remove("show");
    button.classList.remove("active");
  }
}
window.addEventListener("resize", handleResize);

/* CLOSE MENU WHEN CLICKING OUTSIDE */

document.addEventListener("click", (event) => {

  const isClickInsideMenu = menu.contains(event.target);
  const isClickButton = button.contains(event.target);

  if (!isClickInsideMenu && !isClickButton) {

    menu.classList.remove("show");
    button.classList.remove("active");

  }

});

/* AUTO CLOSE WHEN CLICKING A LINK */

document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    menu.classList.remove("show");
    button.classList.remove("active");

  });

});

/* DARK MODE (system preference) */
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function applySystemTheme() {
  document.body.classList.toggle('dark-mode', prefersDarkScheme.matches);
}

applySystemTheme();
prefersDarkScheme.addEventListener('change', applySystemTheme);

// Swap h-logo image in dark mode
window.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var logoImg = document.querySelector('.h-logo img');
  if (!logoImg) return;

  // Determine correct path prefix based on current location
  var pathPrefix = '';
  // If the current path includes a subfolder (e.g., books-projects/ or portfolio-projects/), use '../'
  if (window.location.pathname.includes('/books-projects/') || window.location.pathname.includes('/portfolio-projects/')) {
    pathPrefix = '../';
  }
  var darkLogo = pathPrefix + 'images/dark-mode-ppw-logo-web.svg';
  var lightLogo = pathPrefix + 'images/ppw-logo-web.svg';

  function updateLogo() {
    if (body.classList.contains('dark-mode')) {
      logoImg.src = darkLogo;
    } else {
      logoImg.src = lightLogo;
    }
  }

  // Initial check
  updateLogo();

  // Optional: observe class changes on body
  var observer = new MutationObserver(updateLogo);
  observer.observe(body, { attributes: true, attributeFilter: ['class'] });
});

// First and Last Line

// Prevent runts: join last group of words (>=9 chars) with non-breaking space
function preventRunts(selector) {
  document.querySelectorAll(selector).forEach(el => {
    // Skip if element has children (e.g., <h1><span>text</span></h1>)
    if (el.children.length > 0) return;
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    if (words.length < 2) return;
    let charCount = 0;
    let group = [];
    // Start from the end, collect words until >=9 chars
    for (let i = words.length - 1; i >= 0; i--) {
      group.unshift(words[i]);
      charCount += words[i].length;
      if (charCount >= 9) {
        // Join the rest
        const before = words.slice(0, i).join(' ');
        const after = group.join(' ');
        el.innerHTML = before + (before ? ' ' : '') + after.replace(/ /g, '\u00A0');
        break;
      }
    }
  });
}
// Apply to all p and h1-h6 tags
preventRunts('p, h1, h2, h3, h4, h5, h6');

// Highlight active nav link based on current page using IDs
document.addEventListener('DOMContentLoaded', function () {
  const pageMap = {
    'Home.html': 'home-active',
    'Books.html': 'books-active',
    'Portfolio.html': 'portfolio-active',
    'About.html': 'about-active',
    'Contact.html': 'contact-active'
  };
  const currentPage = location.pathname.split('/').pop();
  const activeId = pageMap[currentPage];
  if (activeId) {
    const activeLink = document.getElementById(activeId);
    if (activeLink) activeLink.classList.add('active');
  }
});

// Cascading fall-and-replace animation on .page-banner h1 hover

document.addEventListener("DOMContentLoaded", function () {
  const h1 = document.querySelector('.page-banner h1');
  if (!h1) return;

  // Only apply split/animation if not mobile/tablet
  function isWideScreen() {
    return window.innerWidth > 1056;
  }

  function setupSplitAndAnimation() {
    // Remove any previous split if present
    if (h1.classList.contains('split')) {
      // Restore original text
      h1.textContent = h1.textContent.replace(/\u00A0/g, ' ');
      h1.classList.remove('split');
    }
    if (!isWideScreen()) return;

    // Split text into spans only once
    if (!h1.classList.contains('split')) {
      const text = h1.textContent;
      h1.innerHTML = '';
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        h1.appendChild(span);
      }
      h1.classList.add('split');
    }

    const spans = h1.querySelectorAll('span');
    let animating = false;
    h1.onmouseenter = function () {
      if (animating) return;
      animating = true;
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('fall-replace');
          setTimeout(() => {
            span.classList.remove('fall-replace');
            if (i === spans.length - 1) {
              animating = false;
            }
          }, 700);
        }, i * 100);
      });
    };
  }

  // Initial setup
  setupSplitAndAnimation();

  // Re-apply on resize
  window.addEventListener('resize', setupSplitAndAnimation);
});

// Hide lightbox overlay on page load (safeguard)
document.addEventListener('DOMContentLoaded', function () {
  var lightbox = document.getElementById('lightbox-overlay');
  if (lightbox) lightbox.style.display = 'none';
});

$(function () {
  var images = [];
  var current = 0;
  var $imgs = $('.project-images img');
  $imgs.each(function () { images.push($(this).attr('src')); });

  function showLightbox(idx) {
    current = idx;
    $('#lightbox-img').attr('src', images[current]);
    $('#lightbox-img').attr('alt', $imgs.eq(current).attr('alt') || '');
    $('#lightbox-overlay').fadeIn(150);
  }

  $imgs.on('click', function () {
    var idx = $imgs.index(this);
    showLightbox(idx);
  });

  $('#lightbox-close').on('click', function () {
    $('#lightbox-overlay').fadeOut(150);
  });

  $('#lightbox-prev').on('click', function (e) {
    e.stopPropagation();
    current = (current - 1 + images.length) % images.length;
    $('#lightbox-img').attr('src', images[current]);
    $('#lightbox-img').attr('alt', $imgs.eq(current).attr('alt') || '');
  });

  $('#lightbox-next').on('click', function (e) {
    e.stopPropagation();
    current = (current + 1) % images.length;
    $('#lightbox-img').attr('src', images[current]);
    $('#lightbox-img').attr('alt', $imgs.eq(current).attr('alt') || '');
  });

  // Keyboard navigation
  $(document).on('keydown', function (e) {
    if ($('#lightbox-overlay').is(':visible')) {
      if (e.key === 'ArrowLeft') $('#lightbox-prev').click();
      if (e.key === 'ArrowRight') $('#lightbox-next').click();
      if (e.key === 'Escape') $('#lightbox-close').click();
    }
  });

  // Click outside image closes lightbox
  $('#lightbox-overlay').on('click', function (e) {
    if (e.target === this) $('#lightbox-close').click();
  });

  // Ensure lightbox opens on click and keyboard for .project-images a
  $(function () {
    var $links = $('.project-images a');
    $links.on('click', function (e) {
      e.preventDefault();
      $(this).find('img').trigger('click'); // trigger the lightbox logic
    });
    $links.on('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
        e.preventDefault();
        $(this).trigger('click');
      }
    });
  });
});

// Masonry initialization for project-images
document.addEventListener('DOMContentLoaded', function () {
  // Masonry for all .project-images (with lightbox)
  var projectGrids = document.querySelectorAll('.project-images');
  projectGrids.forEach(function(projectGrid) {
    new Masonry(projectGrid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      gutter: 24,
      percentPosition: true
    });
  });
  // Masonry for all .showcase-images (no lightbox, normal link behavior)
  var showcaseGrids = document.querySelectorAll('.showcase-images');
  showcaseGrids.forEach(function(showcaseGrid) {
    new Masonry(showcaseGrid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      gutter: 24,
      percentPosition: true
    });
  });
});