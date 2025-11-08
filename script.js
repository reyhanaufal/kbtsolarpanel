// Mobile Menu Toggle
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Optional: Ubah ikon hamburger menjadi 'X' saat aktif
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
        }
    });
});

// Smooth Scroll for Anchor Links (Backup for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// // --- Portfolio Auto-Slider ---
// const track = document.getElementById('sliderTrack');
// const slides = document.querySelectorAll('.slide');
// let currentSlide = 0;
// const slideInterval = 3000; // Ganti slide setiap 3 detik (3000ms)

// function nextSlide() {
//     currentSlide++;
    
//     // Geser track
//     track.style.transform = `translateX(-${currentSlide * 100}%)`;
//     track.style.transition = 'transform 0.5s ease-in-out';

//     // Reset ke awal secara instan jika mencapai slide duplikat terakhir
//     if (currentSlide >= slides.length - 1) {
//         setTimeout(() => {
//             track.style.transition = 'none'; // Matikan transisi agar tidak terlihat 'mundur'
//             currentSlide = 0;
//             track.style.transform = `translateX(0)`;
//         }, 500); // Tunggu transisi selesai (0.5s) baru reset
//     }
// }

// // Mulai auto-slide jika elemen slider ada
// if (track && slides.length > 0) {
//     setInterval(nextSlide, slideInterval);
// }