document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Navegación responsive
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Manejo del popup de presentación
    const openPresentationBtn = document.getElementById('open-presentation');
    const presentationPopup = document.getElementById('presentation-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const presentationVideo = document.getElementById('presentation-video');

    openPresentationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        presentationPopup.style.display = 'block';
    });

    closePopupBtn.addEventListener('click', () => {
        presentationPopup.style.display = 'none';
        presentationVideo.pause();
    });

    window.addEventListener('click', (e) => {
        if (e.target === presentationPopup) {
            presentationPopup.style.display = 'none';
            presentationVideo.pause();
        }
    });

    // Manejo del formulario de contacto
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
            const response = await fetch('https://hook.us2.make.com/vrnerzuvj4njrvlkmae4ydti0mhvsc41', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Success: Form data sent');
                alert('Gracias por tu mensaje. Te contactaré pronto.');
                form.reset();
            } else {
                console.error('Error response:', response.statusText);
                throw new Error(`Error al enviar el formulario: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Hubo un problema al enviar el mensaje: ${error.message}`);
        }
    });

    // Descargar CV
    const downloadCvBtn = document.getElementById('download-cv');
    downloadCvBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('recursos/CVAndermatten.pdf', '_blank');
    });

    // Typing effect
    const text = "Desarrollador Backend & Arquitecto de Sistemas";
    const speed = 50; // Milliseconds per character
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typing-effect").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();

    // Scroll to top button
    const scrollToTopBtn = document.getElementById("scroll-to-top");

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

