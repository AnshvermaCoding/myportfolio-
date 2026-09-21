// Nav Toggle
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    const lines = menuToggle.querySelectorAll("span");
    lines[0].style.transform = isOpen ? "translateY(7px) rotate(45deg)" : "none";
    lines[1].style.opacity = isOpen ? "0" : "1";
    lines[2].style.transform = isOpen ? "translateY(-7px) rotate(-45deg)" : "none";
  });
  
  mobileNavLinks.forEach(link => link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    const lines = menuToggle.querySelectorAll("span");
    lines[0].style.transform = "none"; 
    lines[1].style.opacity = "1"; 
    lines[2].style.transform = "none";
  }));
}

// Active Nav Links
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Smooth Scrolling
const heroLinks = document.querySelectorAll('a[href^="#"]');
heroLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Project Data Dictionary
const projectsData = {
  ezyshop: {
    title: "EzyShop",
    category: "E-Commerce Website",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    desc: "A fully functional e-commerce web application featuring user authentication, product catalog browsing, secure cart management, and seamless backend integration.",
    features: [
      "Responsive frontend UI for mobile and desktop",
      "Dynamic PHP backend with MySQL database",
      "Session-based cart management"
    ]
  },
  quiz: {
    title: "Ultimate Quiz Game",
    category: "Interactive Web App",
    tags: ["HTML", "CSS", "JavaScript"],
    desc: "A dynamic and engaging quiz application leveraging vanilla JavaScript for real-time scoring, interactive state changes, and smooth DOM manipulation.",
    features: [
      "Real-time timer and scoring system",
      "Multiple categories and difficulty levels",
      "Interactive lifelines and hint logic"
    ]
  },
  flybird: {
    title: "Fly Bird",
    category: "Progressive Web App",
    tags: ["HTML", "CSS", "JavaScript", "Kodular"],
    desc: "A mobile-responsive arcade game built natively with web technologies and packaged as a Progressive Web App using Kodular webviews.",
    features: [
      "Custom back-button navigation logic",
      "Tailored mobile layout styling",
      "Smooth animation frame rendering"
    ]
  },
  portfolio: {
    title: "Developer Portfolio",
    category: "Static Web Profile",
    tags: ["HTML5", "CSS3", "Vanilla JS"],
    desc: "A highly optimized, SEO-friendly personal portfolio featuring glassmorphism design, semantic markup, and custom JavaScript interactions.",
    features: [
      "100% responsive dark mode design",
      "Custom JSON-LD schema for search engines",
      "Lightweight custom modal system"
    ]
  }
};

// Modal Logic
const modalOverlay = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const viewBtns = document.querySelectorAll('.view-project-btn');

viewBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const projectId = e.target.getAttribute('data-project');
    const data = projectsData[projectId];
    
    if (data) {
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalCategory').textContent = data.category;
      document.getElementById('modalDesc').textContent = data.desc;
      
      const tagsContainer = document.getElementById('modalTags');
      tagsContainer.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });
      
      const featuresContainer = document.getElementById('modalFeatures');
      featuresContainer.innerHTML = '';
      data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
      });
      
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  });
});

closeModalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modalOverlay.addEventListener('click', (e) => {
  if(e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});




// Scroll Reveal Animation
// Adds animation only; existing website functionality remains unchanged.
document.addEventListener("DOMContentLoaded", () => {
  const revealSelectors = [
    ".section-header",
    ".about-content",
    ".about-image-card",
    ".stat-card",
    ".skill-card",
    ".project-card",
    ".service-card",
    ".process-step",
    ".why-card",
    ".education-box",
    ".achievement-card",
    ".contact-card",
    ".dual-section .education-side",
    ".dual-section .achievement-side"
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(","));

  revealElements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
  });

  document.querySelectorAll(
    ".stats-container, .skills-grid, .projects-grid, .services-grid, " +
    ".process-grid, .why-grid, .edu-timeline"
  ).forEach((container) => {
    container.classList.add("reveal-stagger");
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px"
  });

  revealElements.forEach((element) => observer.observe(element));
});
