document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Project details toggle
    document.querySelectorAll('.project-details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            details.classList.toggle('active');
            button.textContent = details.classList.contains('active') ? 'Ver menos' : 'Ver más';
        });
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
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextImage, 5000);
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
});