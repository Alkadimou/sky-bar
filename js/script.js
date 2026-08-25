document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');
    
    // Mobile menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('header__nav--active');
            menuToggle.classList.toggle('header__menu-toggle--active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (nav && nav.classList.contains('header__nav--active')) {
                nav.classList.remove('header__nav--active');
                if (menuToggle) {
                    menuToggle.classList.remove('header__menu-toggle--active');
                }
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Account for sticky header height
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ScrollSpy Functionality
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.header__nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox__close');
    const galleryItems = document.querySelectorAll('.gallery-section__item');

    if (lightbox && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            // Aggiungiamo cursore a puntatore per far capire che è cliccabile
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', () => {
                const img = item.querySelector('.gallery-section__image');
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    // Preveniamo lo scroll del body
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Chiudi al click sulla X
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Chiudi cliccando fuori dall'immagine (sul background scuro)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Chiudi con il tasto ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
