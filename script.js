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

// --- Renewable Boom Chart (Enhanced) ---
const chartCanvas = document.getElementById('renewableChart');

if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');

    // Gradient fill (green → transparent)
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Global Renewable Additions (GW)',
                data: [280, 295, 320, 440, 510],
                borderColor: '#10b981',
                backgroundColor: gradient,
                borderWidth: 4,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 9,
                pointBackgroundColor: '#059669',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                hoverBorderWidth: 3,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#065f46',
                        font: { family: 'Inter', size: 14 }
                    }
                },
                title: {
                    display: true,
                    text: 'Global Renewable Capacity Additions 2020–2024',
                    color: '#1f2937',
                    font: { size: 20, weight: '600', family: 'Inter' },
                    padding: { top: 10, bottom: 20 }
                },
                tooltip: {
                    backgroundColor: '#065f46',
                    titleFont: { weight: '600' },
                    bodyFont: { size: 14 },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' GW';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#374151', font: { family: 'Inter' } },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#374151', font: { family: 'Inter' } },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    title: {
                        display: true,
                        text: 'Capacity (GW)',
                        color: '#374151',
                        font: { size: 14, family: 'Inter', weight: '600' }
                    }
                }
            },
            animations: {
                tension: {
                    duration: 2000,
                    easing: 'easeOutQuad',
                    from: 0.2,
                    to: 0.4,
                    loop: true
                }
            }
        }
    });
}


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
