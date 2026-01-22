// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('active') ? 'fa fa-times' : 'fa fa-bars';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa fa-bars';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fa fa-bars';
                }
            }
        });
    }

    // Set active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const homeLink = document.querySelector('.nav-menu a[href="index.html"]');

    function setActiveNavLink() {
        const scrollPosition = window.pageYOffset || window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
        
        // If at the top of the page (in hero section), set Home as active
        if (scrollPosition < heroHeight - 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (homeLink) {
                homeLink.classList.add('active');
            }
            return;
        }

        // Otherwise, find which section is currently in view
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Handle Home link
            if (href === 'index.html' && scrollPosition < heroHeight - 100) {
                link.classList.add('active');
            }
            // Handle anchor links
            else if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active state when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            
            // Remove active from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // If it's the Home link, set it active immediately
            if (href === 'index.html') {
                this.classList.add('active');
            }
            // For anchor links, set active and let scroll handler update it
            else if (href.startsWith('#')) {
                this.classList.add('active');
            }
        });
    });

    // Set active link on scroll
    window.addEventListener('scroll', setActiveNavLink);

    // Set active link on page load
    setActiveNavLink();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Update active state after scroll
                    setTimeout(setActiveNavLink, 100);
                }
            }
        });
    });

    // Handle Home link click - scroll to top
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Update active state after scroll
            setTimeout(setActiveNavLink, 100);
        });
    }

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.gallery-item, .project-card, .skill-category, .contact-card, .stat-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add click tracking for script links (optional - for analytics)
    const scriptLinks = document.querySelectorAll('.script-link');
    scriptLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('Script link clicked:', this.href);
        });
    });

    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // You can add a scroll-to-top button here if needed
});

// Cursor Smoke Effect
(function() {
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let particles = [];
    const maxParticles = 50;
    const particleLifetime = 1800; // milliseconds
    let lastParticleTime = 0;
    const particleInterval = 8; // More frequent particle creation
    
    // Create smoke container
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'cursor-smoke-container';
    document.body.appendChild(smokeContainer);
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Calculate movement distance
        const deltaX = mouseX - lastX;
        const deltaY = mouseY - lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const currentTime = Date.now();
        
        // Create particles more consistently - always create at least 1 if moving
        if (distance > 0.5 && currentTime - lastParticleTime > particleInterval) {
            // More particles based on speed, but always at least 1
            const particleCount = Math.max(1, Math.min(Math.floor(distance / 5), 4));
            for (let i = 0; i < particleCount; i++) {
                // Small delay for multiple particles to create trail effect
                setTimeout(function() {
                    createSmokeParticle(mouseX, mouseY, distance);
                }, i * 2);
            }
            lastParticleTime = currentTime;
        }
        
        lastX = mouseX;
        lastY = mouseY;
    });
    
    function createSmokeParticle(x, y, velocity) {
        // Limit particle count
        if (particles.length >= maxParticles) {
            const oldParticle = particles.shift();
            if (oldParticle && oldParticle.element) {
                oldParticle.element.remove();
            }
        }
        
        // Create particle element
        const particle = document.createElement('div');
        particle.className = 'smoke-particle';
        
        // More organic random offset for natural smoke effect
        const angle = Math.random() * Math.PI * 2;
        const radius = 8 + Math.random() * 12;
        const randomX = Math.cos(angle) * radius;
        const randomY = Math.sin(angle) * radius - 5; // Slight upward bias
        
        // Set initial position (centered on cursor)
        particle.style.left = (x - 6) + 'px';
        particle.style.top = (y - 6) + 'px';
        
        // Set random animation variables with smoother distribution
        particle.style.setProperty('--random-x', randomX + 'px');
        particle.style.setProperty('--random-y', randomY + 'px');
        
        // More refined size variation (smaller, more consistent)
        const size = 10 + Math.random() * 8;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Add to container
        smokeContainer.appendChild(particle);
        
        // Store particle info
        const particleInfo = {
            element: particle,
            createdAt: Date.now()
        };
        particles.push(particleInfo);
        
        // Remove particle after animation
        setTimeout(function() {
            if (particle.parentNode) {
                particle.style.transition = 'opacity 0.2s ease-out';
                particle.style.opacity = '0';
                setTimeout(function() {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 200);
            }
            const index = particles.indexOf(particleInfo);
            if (index > -1) {
                particles.splice(index, 1);
            }
        }, particleLifetime);
    }
    
    // Clean up particles periodically
    setInterval(function() {
        const now = Date.now();
        particles = particles.filter(function(p) {
            if (now - p.createdAt > particleLifetime) {
                if (p.element && p.element.parentNode) {
                    p.element.remove();
                }
                return false;
            }
            return true;
        });
    }, 500);
})();

