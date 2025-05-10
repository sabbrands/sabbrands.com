document.addEventListener('DOMContentLoaded', () => {
       // Swiper Configs
    const swiperConfigs = {
        hero: {
            slidesPerView: 1,
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            speed: 800,
            pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.hero-swiper .swiper-button-next',
                prevEl: '.hero-swiper .swiper-button-prev'
            },
            effect: 'fade',
            fadeEffect: { crossFade: true }
        },
        trendingBase: { // Base config for all trending swipers
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: { 
                delay: 2000, 
                disableOnInteraction: false, 
                pauseOnMouseEnter: true 
            },
            pagination: { 
                el: '.trending-swiper-1 .swiper-pagination', 
                clickable: true 
            },
            navigation: {
                nextEl: '.trending-swiper-1 .swiper-button-next',
                prevEl: '.trending-swiper-1 .swiper-button-prev'  
            },
            breakpoints: {
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
                1200: { slidesPerView: 5 }
            },
            on: {
                init: function() {
                    this.el.addEventListener('mouseleave', () => {
                        if (!this.autoplay.running) {
                            this.autoplay.resume();
                        }
                    });
                }
            }
        }
    };

    // Initialize All Swipers
    const heroSwiper = new Swiper('.hero-swiper', swiperConfigs.hero);
    
    // Trending Swiper 1
    const trendingSwiper1 = new Swiper('.trending-swiper-1', {
        ...swiperConfigs.trendingBase
    });
    
    // Trending Swiper 2
    const trendingSwiper2 = new Swiper('.trending-swiper-2', {
        ...swiperConfigs.trendingBase,
        autoplay: { 
            ...swiperConfigs.trendingBase.autoplay, 
            delay: 2000 
        },
        pagination: {
            el: '.trending-swiper-2 .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.trending-swiper-2 .swiper-button-next',
            prevEl: '.trending-swiper-2 .swiper-button-prev'
        }
    });
    
    // Trending Swiper 3
    const trendingSwiper3 = new Swiper('.trending-swiper-3', {
        ...swiperConfigs.trendingBase,
        autoplay: { 
            ...swiperConfigs.trendingBase.autoplay, 
            delay: 2000 
        },
        pagination: {
            el: '.trending-swiper-3 .swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.trending-swiper-3 .swiper-button-next',
            prevEl: '.trending-swiper-3 .swiper-button-prev'
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse) document.querySelector('.navbar-toggler').click();
        });
    });

    // Active Nav Links
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        let currentSection = '';

        sections.forEach(section => {
            const { offsetTop, offsetHeight } = section;
            if (window.pageYOffset >= offsetTop - navbarHeight - 10 && 
                window.pageYOffset < offsetTop + offsetHeight - navbarHeight - 10) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', 
                link.getAttribute('href') === `#${currentSection}` || 
                (currentSection === 'home' && link.getAttribute('href') === '#home')
            );
        });
    });
});
