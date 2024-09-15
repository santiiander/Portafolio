document.addEventListener('DOMContentLoaded', function () {
    var splide = new Splide('.splide', {
        type       : 'loop',
        perPage    : 1,
        autoplay   : true,
        interval   : 5000,
        arrows     : false,
    });
    splide.mount();
    
});



