document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .work-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Hero text animation
    const titleWords = document.querySelectorAll('.title-word');
    const subtitle = document.querySelector('.hero-subtitle');
    
    setTimeout(() => {
        titleWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.transform = 'translateY(0)';
                word.style.opacity = '1';
            }, index * 200);
        });
        
        setTimeout(() => {
            subtitle.style.transform = 'translateY(0)';
            subtitle.style.opacity = '1';
        }, titleWords.length * 200 + 200);
    }, 500);
    
    // Scroll animations
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.section');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if section is in viewport
            if (scrollPosition > sectionTop - windowHeight + 100) {
                // Animate section title
                const title = section.querySelector('.section-title');
                if (title && title.style.opacity === '0') {
                    title.style.animation = 'fadeInUp 0.6s ease forwards';
                }
                
                // Section-specific animations
                if (sectionId === 'about') {
                    const aboutTexts = section.querySelectorAll('.about-text p');
                    const aboutImage = section.querySelector('.image-container');
                    
                    aboutTexts.forEach((text, index) => {
                        setTimeout(() => {
                            text.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 200);
                    });
                    
                    if (aboutImage) {
                        setTimeout(() => {
                            aboutImage.style.opacity = '1';
                            aboutImage.style.transform = 'scale(1)';
                        }, aboutTexts.length * 200);
                    }
                }
                
                if (sectionId === 'work') {
                    const workItems = section.querySelectorAll('.work-item');
                    
                    workItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 150);
                    });
                }
                
                if (sectionId === 'skills') {
                    const skillCategories = section.querySelectorAll('.skill-category');
                    
                    skillCategories.forEach((category, index) => {
                        setTimeout(() => {
                            category.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 150);
                    });
                }
                
                if (sectionId === 'contact') {
                    const formGroups = section.querySelectorAll('.form-group');
                    const submitBtn = section.querySelector('.submit-btn');
                    
                    formGroups.forEach((group, index) => {
                        setTimeout(() => {
                            group.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 150);
                    });
                    
                    if (submitBtn) {
                        setTimeout(() => {
                            submitBtn.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, formGroups.length * 150 + 150);
                    }
                }
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '15px 40px';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '20px 40px';
            navbar.style.boxShadow = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.certificate-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    let isAnimating = false;
    
    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => !isAnimating && goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        isAnimating = true;
        const direction = index > currentSlide ? 1 : -1;
        
        // Set leaving state for current slide
        slides[currentSlide].classList.add('leaving');
        slides[currentSlide].classList.remove('active');
        
        // Prepare new slide
        slides[index].style.transform = `translateX(${direction * 50}px)`;
        slides[index].classList.add('active');
        
        // Animate
        setTimeout(() => {
            slides[currentSlide].classList.remove('leaving');
            slides[index].style.transform = 'translateX(0)';
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
            isAnimating = false;
        }, 20);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => !isAnimating && nextSlide());
    prevBtn.addEventListener('click', () => !isAnimating && prevSlide());
    
    // Initialize first slide
    slides[0].classList.add('active');
    slides[0].style.transform = 'translateX(0)';
    
    // Auto-rotate (optional)
    let slideInterval = setInterval(nextSlide, 20000);
    
    document.querySelector('.certificate-slider').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    document.querySelector('.certificate-slider').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 20000);
    });
});
