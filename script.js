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


// =========================================
// LOGIKA PORTFOLIO MARQUEE & MODAL (FINAL ROBUST VERSION)
// =========================================

const marqueeContainer = document.getElementById('marqueeContainer');
const marqueeContent = document.getElementById('marqueeContent');

let isDown = false;
let startX;
let scrollLeftVal;
// KECEPATAN: Sesuaikan nilai ini (misal 0.3 untuk lebih lambat, 1 untuk normal)
let autoScrollSpeed = 0.5;

let autoScrollId = null;
let isAutoScrolling = false;

// --- [FUNGSI 1: AUTO-SCROLL LEBIH MULUS] ---
function startAutoScroll() {
    if (isAutoScrolling) return; // Mencegah duplikasi animasi
    isAutoScrolling = true;
    loop(); // Memulai loop
}

function loop() {
    if (!isAutoScrolling) return;

    // Gerakkan scroll
    marqueeContainer.scrollLeft += autoScrollSpeed;

    // [LOGIKA RESET YANG LEBIH MULUS]
    // Kita asumsikan konten diduplikasi menjadi 2 bagian yang identik.
    // Saat scroll mencapai setengah dari total lebar konten, kita mundurkan posisinya
    // tepat setengahnya. Ini lebih mulus daripada menunggu sampai ujung benar-benar mentok.
    const halfWidth = marqueeContent.scrollWidth / 2;
    if (marqueeContainer.scrollLeft >= halfWidth) {
        // Alih-alih '= 0', kita kurangi dengan halfWidth agar sisa desimal gerakan tetap tersimpan
        // Ini mencegah lompatan mikro (jitter)
         marqueeContainer.scrollLeft -= halfWidth;
    }

    autoScrollId = requestAnimationFrame(loop);
}

function stopAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollId) {
        cancelAnimationFrame(autoScrollId);
        autoScrollId = null;
    }
}

// --- [FUNGSI 2: INTERAKSI USER (DRAG & HOVER)] ---

// Mouse Events
marqueeContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    marqueeContainer.classList.add('active');
    startX = e.pageX - marqueeContainer.offsetLeft;
    scrollLeftVal = marqueeContainer.scrollLeft;
    stopAutoScroll(); // Stop saat mulai drag
});

marqueeContainer.addEventListener('mouseup', () => {
    isDown = false;
    marqueeContainer.classList.remove('active');
    // Cek apakah mouse masih di atas container setelah lepas klik
    if (!marqueeContainer.matches(':hover')) {
         startAutoScroll();
    }
});

marqueeContainer.addEventListener('mouseleave', () => {
    isDown = false;
    marqueeContainer.classList.remove('active');
    startAutoScroll(); // Lanjut scroll saat mouse pergi
});

marqueeContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - marqueeContainer.offsetLeft;
    const walk = (x - startX) * 2; // Kecepatan drag manual
    marqueeContainer.scrollLeft = scrollLeftVal - walk;
});

// [FITUR PAUSE SAAT HOVER]
// Menggunakan 'mouseenter' pada container utama agar lebih stabil
marqueeContainer.addEventListener('mouseenter', () => {
    if (!isDown) stopAutoScroll();
});

// Touch Events (HP/Tablet)
marqueeContainer.addEventListener('touchstart', stopAutoScroll, { passive: true });
marqueeContainer.addEventListener('touchend', () => {
    // Jeda sedikit sebelum lanjut agar smooth setelah swipe
    setTimeout(startAutoScroll, 1000);
});

// --- [FUNGSI 3: VISIBILITY API (PENTING UNTUK MENCEGAH BLINK)] ---
// Menghentikan animasi jika user pindah tab, mencegah browser "menumpuk" frame animasi.
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopAutoScroll();
    } else {
        // Hanya lanjutkan jika tidak ada modal yang terbuka
        if (modal.style.display !== "flex") {
            startAutoScroll();
        }
    }
});

// Mulai pertama kali
startAutoScroll();


// =========================================
// LOGIKA MODAL POP-UP
// =========================================

const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');

function openModal(imgSrc, title, desc) {
    modal.style.display = "flex";
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    
    stopAutoScroll(); // Pastikan animasi berhenti total saat modal buka
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = "none";
    modalImg.src = "";
    
    startAutoScroll(); // Lanjutkan animasi
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// [EVENT LISTENER TOMBOL KEYBOARD]
// Menambahkan fungsi untuk mendeteksi jika tombol ditekan di seluruh halaman
document.addEventListener('keydown', function(event) {
    // Mengecek apakah tombol yang ditekan adalah 'Escape' (atau 'Esc' untuk browser lama)
    // DAN apakah modal sedang terbuka (display-nya 'flex')
    if ((event.key === 'Escape' || event.key === 'Esc') && modal.style.display === 'flex') {
        closeModal(); // Panggil fungsi penutup modal yang sama
    }
});


// // Smooth Scroll for Anchor Links (Backup for older browsers)
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         const targetId = this.getAttribute('href');
//         if (targetId === '#') return;

//         const targetElement = document.querySelector(targetId);
//         if (targetElement) {
//             e.preventDefault();
//             targetElement.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

function calculateROI() {

    const customerType = document.getElementById('customerType').value;
    const monthlyKwh = parseFloat(document.getElementById('monthlyKwh').value);
    const tariff = parseFloat(document.getElementById('tariff').value);
    const costPerKwp = parseFloat(document.getElementById('costPerKwp').value);

    if (isNaN(monthlyKwh) || monthlyKwh <= 0) {
        alert("Please enter valid monthly energy consumption.");
        return;
    }

    /* ================================
       PLN & TECHNICAL ASSUMPTIONS
       ================================ */

    // Average solar yield in Indonesia (kWh/kWp/year)
    const solarYield = 1300;

    // Export factor (PLN net-metering assumption – conservative)
    const selfConsumptionFactor = {
        residential: 0.75,
        commercial: 0.85,
        industrial: 0.90
    };

    // CO₂ emission factor Indonesia grid (kg CO2 / kWh)
    const emissionFactor = 0.82;

    /* ================================
       LOAD ANALYSIS
       ================================ */

    const annualLoad = monthlyKwh * 12;

    // Size system to offset ~80% of annual load
    const systemSize = (annualLoad * 0.8) / solarYield;

    const annualProduction = systemSize * solarYield;
    const usableEnergy = annualProduction * selfConsumptionFactor[customerType];

    /* ================================
       FINANCIAL MODEL
       ================================ */

    const annualSavings = usableEnergy * tariff;
    const totalInvestment = systemSize * costPerKwp;
    const paybackPeriod = totalInvestment / annualSavings;

    /* ================================
       CARBON OFFSET
       ================================ */

    const co2Reduction = (usableEnergy * emissionFactor) / 1000;

    /* ================================
       UPDATE UI
       ================================ */

    document.getElementById('systemSize').textContent =
        systemSize.toFixed(2);

    document.getElementById('annualEnergy').textContent =
        annualProduction.toFixed(0);

    document.getElementById('annualSavings').textContent =
        annualSavings.toLocaleString('id-ID');

    document.getElementById('payback').textContent =
        paybackPeriod.toFixed(1);

    document.getElementById('co2Reduction').textContent =
        co2Reduction.toFixed(2);
}

// =========================================
// NEWSLETTER EMAIL HANDLER
// =========================================

function handleSubscribe(event) {
    event.preventDefault(); // Mencegah form reload halaman

    // 1. Ambil email yang diinput user
    const emailInput = document.getElementById('userEmail').value;

    // 2. Konfigurasi Email Tujuan & Template Pesan
    const companyEmail ="info@sustainabilityenergyserv.co.id";
    const subject = "Interest in Sustainable Energy Services"; // Subjek Email
    
    // Isi pesan template (Bahasa Inggris sesuai website)
    // \n digunakan untuk enter/baris baru
    const bodyMessage = `Hello Sustainable Energy Service Team,

I am interested in your renewable energy solutions and would like to receive latest updates and offers.

Please keep me informed.

My Email: ${emailInput}
Thank you.`;

    // 3. Buat Link Mailto
    // encodeURIComponent digunakan agar spasi dan enter terbaca dengan benar di link
    const mailtoLink = `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyMessage)}`;

    // 4. Buka Email Client
    window.location.href = mailtoLink;
    
    // Opsional: Reset form setelah dikirim
    document.getElementById('userEmail').value = '';
}

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
