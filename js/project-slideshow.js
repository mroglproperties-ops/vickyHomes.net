const slides = document.querySelectorAll('.project-slide');
const dots = document.querySelectorAll('.slideshow-dot');
let current = 0;

function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

document.querySelector('.slideshow-btn-prev')?.addEventListener('click', () => goTo(current - 1));
document.querySelector('.slideshow-btn-next')?.addEventListener('click', () => goTo(current + 1));

dots.forEach(dot => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
});
