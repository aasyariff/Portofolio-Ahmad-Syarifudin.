/**
 * main.js - Logic Utama Portofolio Ananda Satria Ariyanto
 * Ditulis dalam JavaScript Murni (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DATA PORTOFOLIO (ARRAY)
       ========================================================================== */
    const projectsData = [
        {
            id: 1,
            title: "Sistem Informasi Akademik Mini",
            category: "web",
            description: "Aplikasi pengelolaan nilai dan mata kuliah sederhana dengan arsitektur MVC PHP murni dan basis data MySQL.",
            tags: ["PHP", "MySQL", "JavaScript", "CSS3"],
            demoUrl: "#",
            githubUrl: "https://github.com"
        },
        {
            id: 2,
            title: "Clipper - Code Snippet Manager",
            category: "other",
            description: "Aplikasi desktop ringan untuk menyimpan dan mengorganisir potongan kode sumber dengan fitur pencarian cepat.",
            tags: ["Python", "SQLite", "Tkinter"],
            demoUrl: "#",
            githubUrl: "https://github.com"
        },
        {
            id: 3,
            title: "Aplikasi Catatan Keuangan Mahasiswa",
            category: "mobile",
            description: "Pencatat pemasukan dan pengeluaran harian berbasis responsif web mobile dengan penyimpanan lokal (LocalStorage).",
            tags: ["JavaScript", "HTML5", "Tailwind CSS"],
            demoUrl: "#",
            githubUrl: "https://github.com"
        }
    ];

    /* ==========================================================================
       2. RENDER PORTOFOLIO & FILTERING
       ========================================================================== */
    const projectsGrid = document.getElementById('projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Fungsi Render Card Proyek
    function renderProjects(items) {
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        items.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const tagsHtml = project.tags.map(tag => `<span class="project-tag font-mono">#${tag}</span>`).join('');

            card.innerHTML = `
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                </div>
                <div class="project-links font-mono">
                    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">[Demo]</a>
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">[GitHub]</a>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // Inisialisasi Render Pertama
    renderProjects(projectsData);

    // Event Listener Filter
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove Active Class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'all') {
                renderProjects(projectsData);
            } else {
                const filtered = projectsData.filter(p => p.category === filterValue);
                renderProjects(filtered);
            }
        });
    });

    /* ==========================================================================
       3. TYPING EFFECT (TEXT KETIK HERO)
       ========================================================================== */
    const typingTextElement = document.getElementById('typing-text');
    const enableTyping = true; // Set false jika ingin mematikan animasi ketik

    if (enableTyping && typingTextElement) {
        const words = [
            "Mahasiswa Baru Rumpun Informatika UNESA 2026",
            "Junior Web Developer",
            "Tech & Security Enthusiast"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Diam sebentar saat kata selesai diketik
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Jalankan efek ketik
        type();
    }

    /* ==========================================================================
       4. HAMBURGER MENU (MOBILE)
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
        });

        // Tutup menu mobile saat salah satu link diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================================================
       5. INTERSECTION OBSERVER (SCROLL HIGHLIGHT & FADE-IN)
       ========================================================================== */
    
    // Highlight Navbar Pas Scroll
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        threshold: 0.3
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    // Fade-in Animasi Elemen
    const fadeElements = document.querySelectorAll('.fade-element');

    const fadeObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Lepas observasi setelah animasi berjalan
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    /* ==========================================================================
       6. VALIDASI FORM KONTAK (CLIENT-SIDE)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    const successAlert = document.getElementById('form-success-alert');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset Status Error
            [nameInput, emailInput, messageInput].forEach(i => i.classList.remove('invalid'));
            [errorName, errorEmail, errorMessage].forEach(e => e.style.display = 'none');
            successAlert.style.display = 'none';

            // Validasi Nama
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('invalid');
                errorName.style.display = 'block';
                isValid = false;
            }

            // Validasi Email
            if (!validateEmail(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                errorEmail.style.display = 'block';
                isValid = false;
            }

            // Validasi Pesan
            if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('invalid');
                errorMessage.style.display = 'block';
                isValid = false;
            }

            // Jika Valid
            if (isValid) {
                successAlert.style.display = 'block';
                contactForm.reset();
                
                // Hilangkan pesan sukses setelah 5 detik
                setTimeout(() => {
                    successAlert.style.display = 'none';
                }, 5000);
            }
        });
    }
});