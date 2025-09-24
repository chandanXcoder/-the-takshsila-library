// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator animation
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .gallery-item, .video-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Feature cards hover effect
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = createLightbox(img.src, img.alt);
        document.body.appendChild(lightbox);
    });
});

// Create lightbox modal
function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;
    
    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    return lightbox;
}

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else {
        notification.style.backgroundColor = '#f44336';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Add CSS for lightbox
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 10001;
    }
    
    .lightbox-close:hover {
        color: #ff6b6b;
    }
`;

// Inject lightbox styles
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (document.body.contains(loader)) {
                document.body.removeChild(loader);
            }
        }, 500);
    });
});

// Add loader styles
const loaderStyles = `
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    
    .loader {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const loaderStyleSheet = document.createElement('style');
loaderStyleSheet.textContent = loaderStyles;
document.head.appendChild(loaderStyleSheet);



const data = [
    {id:1,name:"Aman Kumar", year:2024, img:"https://picsum.photos/seed/a1/600/400", desc:"Top scorer in board exam"},
    {id:2,name:"Sana Khan", year:2023, img:"https://picsum.photos/seed/a2/600/400", desc:"Science fair winner"},
    {id:3,name:"Arun R", year:2022, img:"https://picsum.photos/seed/a3/600/400", desc:"Math Olympiad medal"},
    {id:4,name:"Neha Verma", year:2024, img:"https://picsum.photos/seed/a4/600/400", desc:"National Quiz finalist"},
    {id:5,name:"Ravi Patel", year:2023, img:"https://picsum.photos/seed/a5/600/400", desc:"Essay competition winner"},
    {id:6,name:"Arun R", year:2022, img:"Sona lal.jpg", desc:"Math Olympiad medal"},
    {id:7,name:"Neha Verma", year:2024, img:"https://picsum.photos/seed/a4/600/400", desc:"National Quiz finalist"},
    {id:8,name:"Ravi Patel", year:2023, img:"https://picsum.photos/seed/a5/600/400", desc:"Essay competition winner"}
  ];
  
  const gallery = document.getElementById('gallery');
  const search = document.getElementById('search');
  const filterBtns = document.querySelectorAll('.filters button');
  
  let currentIndex = 0;
  let visible = data;
  
  function render(items){
    gallery.innerHTML = items.map((it, idx)=>`
      <article class="card" tabindex="0" data-index="${idx}" aria-label="${it.name} — ${it.desc}">
        <img loading="lazy" src="${it.img}" alt="${it.name}">
        <div class="meta">
          <div class="name">${it.name}</div>
          <div class="sub">Year ${it.year}</div>
        </div>
      </article>`).join('');
    attachCardEvents();
  }
  
  function attachCardEvents(){
    document.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('click', ()=>{
        const idx = Number(card.dataset.index);
        openModal(idx);
      });
      card.addEventListener('keydown', e=>{
        if(e.key === 'Enter') card.click();
      });
    });
  }
  
  /* Modal */
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  
  function openModal(idx){
    currentIndex = idx;
    const item = visible[idx];
    modalImg.src = item.img;
    modalImg.alt = item.name;
    modalCaption.textContent = `${item.name} — ${item.desc} (${item.year})`;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
  prevBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex-1+visible.length)%visible.length; openModal(currentIndex);});
  nextBtn.addEventListener('click', ()=>{ currentIndex = (currentIndex+1)%visible.length; openModal(currentIndex);});
  document.addEventListener('keydown', e=>{
    if(modal.getAttribute('aria-hidden')==='false'){
      if(e.key==='Escape') closeModal();
      if(e.key==='ArrowLeft') prevBtn.click();
      if(e.key==='ArrowRight') nextBtn.click();
    }
  });
  
  /* Filters & Search */
  filterBtns.forEach(b=>{
    b.addEventListener('click', ()=>{
      filterBtns.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      applyFilters();
    });
  });
  search.addEventListener('input', applyFilters);
  
  function applyFilters(){
    const q = search.value.trim().toLowerCase();
    const filter = document.querySelector('.filters .active').dataset.filter;
    visible = data.filter(it=>{
      const matchSearch = it.name.toLowerCase().includes(q) || String(it.year).includes(q);
      const matchFilter = (filter==='all') ? true : String(it.year)===filter;
      return matchSearch && matchFilter;
    });
    render(visible);
  }
  
  /* Init */
  render(data);
  