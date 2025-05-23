// Slideshow functionality
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'];
let current = 0;

function showNextImage() {
  const img = document.getElementById('slideshow-image');
  current = (current + 1) % images.length;
  img.src = images[current];
}
setInterval(showNextImage, 3000);

// Dark mode toggle
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});
let slides = document.querySelectorAll('.slide');
let index = 0;

setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 3000);
