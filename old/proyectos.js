function toggleProjectDetails(projectId) {
    const projectCard = document.getElementById(projectId);
    const projectDetails = projectCard.querySelector('.project-details');
    const projectLink = projectCard.querySelector('.project-link');

    projectDetails.classList.toggle('active');

    if (projectDetails.classList.contains('active')) {
        projectLink.innerHTML = '<span>Cerrar</span>';
        projectCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        projectLink.innerHTML = '<span>Explorar</span>';
    }

    // Close other open project details
    const allProjectCards = document.querySelectorAll('.project-card');
    allProjectCards.forEach((card) => {
        if (card.id !== projectId) {
            const details = card.querySelector('.project-details');
            const link = card.querySelector('.project-link');
            details.classList.remove('active');
            link.innerHTML = '<span>Explorar</span>';
        }
    });
}