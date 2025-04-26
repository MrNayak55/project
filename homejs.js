document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Sticky header on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Faculty horizontal scroll with mouse drag
    const facultyGrid = document.querySelector('.faculty-grid');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    facultyGrid.addEventListener('mousedown', (e) => {
      isDown = true;
      facultyGrid.classList.add('active');
      startX = e.pageX - facultyGrid.offsetLeft;
      scrollLeft = facultyGrid.scrollLeft;
    });
    
    facultyGrid.addEventListener('mouseleave', () => {
      isDown = false;
      facultyGrid.classList.remove('active');
    });
    
    facultyGrid.addEventListener('mouseup', () => {
      isDown = false;
      facultyGrid.classList.remove('active');
    });
    
    facultyGrid.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - facultyGrid.offsetLeft;
      const walk = (x - startX) * 2;
      facultyGrid.scrollLeft = scrollLeft - walk;
    });
    
    // Recruiters horizontal auto-scroll
    const recruiterLogos = document.querySelector('.recruiter-logos');
    let scrollAmount = 0;
    let scrollSpeed = 1;
    
    function autoScroll() {
      recruiterLogos.scrollLeft += scrollSpeed;
      scrollAmount += Math.abs(scrollSpeed);
      
      // Reset scroll position when reaching the end
      if (scrollAmount >= recruiterLogos.scrollWidth - recruiterLogos.clientWidth) {
        recruiterLogos.scrollLeft = 0;
        scrollAmount = 0;
      }
      
      requestAnimationFrame(autoScroll);
    }
    
    // Pause auto-scroll on hover
    recruiterLogos.addEventListener('mouseenter', () => {
      scrollSpeed = 0;
    });
    
    recruiterLogos.addEventListener('mouseleave', () => {
      scrollSpeed = 1;
    });
    
    // Start auto-scroll
    autoScroll();
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.program-card, .faculty-card, .stat-card');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.program-card, .faculty-card, .stat-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
  });
  // Auto-scroll faculty grid
function setupFacultyAutoScroll() {
    const facultyGrid = document.querySelector('.faculty-grid');
    const facultyContainer = document.querySelector('.faculty-scroll-container');
    
    // Clone faculty cards for seamless looping
    const cards = facultyGrid.querySelectorAll('.faculty-card');
    cards.forEach(card => {
      facultyGrid.appendChild(card.cloneNode(true));
    });
  
    // Reset animation when it ends
    facultyGrid.addEventListener('animationiteration', () => {
      facultyGrid.style.animation = 'none';
      setTimeout(() => {
        facultyGrid.style.animation = 'scroll-horizontal 20s linear infinite';
      }, 10);
    });
  
    // Touch device support
    let isDragging = false;
    let startX, scrollLeft;
  
    facultyContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      facultyGrid.style.animationPlayState = 'paused';
      startX = e.pageX - facultyContainer.offsetLeft;
      scrollLeft = facultyContainer.scrollLeft;
    });
  
    facultyContainer.addEventListener('mouseleave', () => {
      isDragging = false;
      facultyGrid.style.animationPlayState = 'running';
    });
  
    facultyContainer.addEventListener('mouseup', () => {
      isDragging = false;
      facultyGrid.style.animationPlayState = 'running';
    });
  
    facultyContainer.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - facultyContainer.offsetLeft;
      const walk = (x - startX) * 2;
      facultyContainer.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', setupFacultyAutoScroll);
  