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
    const animatedElements = document.querySelectorAll('.gallery-item, .project-card, .skill-category, .contact-card, .stat-card');
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
});

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // You can add a scroll-to-top button here if needed
});

