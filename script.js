document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isScrolling = false;
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Adjust this value to change the scroll sensitivity

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Improved scroll handling
    main.addEventListener('scroll', () => {
        if (isScrolling) return;

        const currentScrollTop = main.scrollTop;
        const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
        const scrollDifference = Math.abs(currentScrollTop - lastScrollTop);

        if (scrollDifference > scrollThreshold) {
            isScrolling = true;
            const currentSectionIndex = Array.from(sections).findIndex(section => 
                section.offsetTop <= currentScrollTop + window.innerHeight / 2 &&
                section.offsetTop + section.offsetHeight > currentScrollTop + window.innerHeight / 2
            );

            let targetIndex = scrollDirection === 'down' ? currentSectionIndex + 1 : currentSectionIndex - 1;
            targetIndex = Math.max(0, Math.min(targetIndex, sections.length - 1));

            sections[targetIndex].scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                isScrolling = false;
                lastScrollTop = main.scrollTop;
            }, 1000);
        } else {
            lastScrollTop = currentScrollTop;
        }
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function showImage(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    nextButton.addEventListener('click', nextImage);
    prevButton.addEventListener('click', prevImage);

    // Auto-slide every 5 seconds
    let autoSlideInterval = setInterval(nextImage, 5000);

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextImage, 5000);
    });

                // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            name: formData.get('name'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('https://sheetdb.io/api/v1/vq0vb4rjtuy0i', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    data: [data]
                })
            });

            const result = await response.json();
            
            if (response.ok) {
                console.log('Success:', result);
                alert('Gracias por tu mensaje. Te contactaré pronto.');
                form.reset();
            } else {
                console.error('Error response:', result);
                throw new Error(`Error al enviar el formulario: ${result.error || response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Hubo un problema al enviar el mensaje: ${error.message}`);
        }
    });
});