document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slides img');
    const numSlides = slideImages.length;
    let index = 0;

    // Set initial styles
    slides.style.width = `${100 * numSlides}%`;
    slideImages.forEach(img => {
        img.style.width = `${100 / numSlides}%`;
    });

    function showNextSlide() {
        index = (index + 1) % numSlides;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        const offset = -index * (100 / numSlides);
        slides.style.transform = `translateX(${offset}%)`;
    }

    // Handle window resize
    function handleResize() {
        updateSlidePosition();
    }

    window.addEventListener('resize', handleResize);

    setInterval(showNextSlide, 3000); // Change every 3 seconds

    // Optional: Add touch/swipe support
    let startX, moveX;
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', e => {
        moveX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', e => {
        if (startX - moveX > 50) {
            showNextSlide();
        } else if (moveX - startX > 50) {
            index = (index - 1 + numSlides) % numSlides;
            updateSlidePosition();
        }
    });
});