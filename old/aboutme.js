let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? "block" : "none";
    });
}

function moveSlide(step) {
    slideIndex += step;
    showSlides();
}

// Mostrar el primer slide al cargar la página
showSlides();

// Código para abrir y cerrar el modal
const modal = document.getElementById("project-modal");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-item").forEach(item => {
    item.addEventListener("click", function() {
        modal.style.display = "block";
    });
});

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
