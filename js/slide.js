document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-mockup');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    let currentIndex = 0;

    function changeImage(index) {
        mainImage.src = thumbnails[index].src;
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[index].classList.add('active');
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        changeImage(currentIndex);
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            currentIndex = index;
            changeImage(currentIndex);
        });
    });

    // Cambio automático cada 5 segundos
    setInterval(nextImage, 5000);
});