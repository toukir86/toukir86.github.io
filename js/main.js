/**
 * Main JavaScript for Portfolio Website
 * Handles UI interactions, navigation, filtering, and form submission
 */

// ============================================
// PROFILE IMAGE LOADER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.getElementById('profileImage');
    
    if (profileImage) {
        // Create a new image to check if profile.jpg exists
        const testImg = new Image();
        testImg.onload = () => {
            // Image loaded successfully
            profileImage.src = './assets/profile.jpg';
        };
        testImg.onerror = () => {
            // Fallback if image doesn't exist
            console.warn('Profile image not found at ./assets/profile.jpg. Using placeholder.');
            profileImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23e0e0e0" width="300" height="300"/%3E%3Ccircle cx="150" cy="100" r="40" fill="%23999"/%3E%3Cellipse cx="150" cy="200" rx="60" ry="50" fill="%23999"/%3E%3Ctext x="50%25" y="270" text-anchor="middle" fill="%23666" font-size="14"%3EProfile Photo%3C/text%3E%3C/svg%3E';
            profileImage.alt = 'Profile Photo Placeholder';
        };
        testImg.src = './assets/profile.jpg';
    }
});

// ============================================
// NAVIGATION & HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ============================================
// TRAINING CAROUSEL
// ============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.training-slide');
const indicators = document.querySelectorAll('.carousel-indicators .indicator');
const carousel = document.querySelector('.training-carousel');

function showSlide(index) {
    if (slides.length === 0) return;

    // Normalize index
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Update carousel transform
    const offset = currentSlide * -100;
    carousel.style.transform = `translateX(${offset}%)`;

    // Update indicators
    indicators.forEach((indicator, idx) => {
        if (idx === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Carousel button handlers
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
}

// Indicator handlers
indicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Optional: Auto-advance carousel every 5 seconds
// Uncomment below to enable auto-advance
// setInterval(() => {
//     showSlide(currentSlide + 1);
// }, 5000);

// ============================================
// PUBLICATION FILTERING & SEARCH
// ============================================

const searchInput = document.getElementById('publicationSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationsList = document.getElementById('publicationsList');

const publicationData = [
    {
        title: 'Exploring mental health disparities in Mozambique: Depression and anxiety symptoms among reproductive-aged women using data from Mozambique Demographic and Health Survey 2022–23',
        authors: 'Syed Toukir Ahmed Noor',
        authorship: 'first-author',
        journal: 'Global Epidemiology',
        year: 2025,
        doi: '10.1016/j.gloepi.2025.100223',
        url: 'https://doi.org/10.1016/j.gloepi.2025.100223',
        citations: 0
    },
    {
        title: 'The association of cyberbullying with major depressive disorders among Bangladeshi female adolescents: findings from the Bangladesh adolescent health and wellbeing survey 2019-20',
        authors: 'Syed Toukir Ahmed Noor',
        authorship: 'first-author',
        journal: 'BMC Psychiatry',
        year: 2025,
        doi: '10.1186/s12888-025-07234-z',
        url: 'https://doi.org/10.1186/s12888-025-07234-z',
        citations: 0
    },
    {
        title: 'Prevalence, Determinants, and Wealth-related Inequality of Anxiety and Depression Symptoms Among Reproductive-Aged Women (15-49 years) in Nepal: An Analysis of Nationally Representative Nepal Demographic and Health Survey Data 2022',
        authors: 'Syed Toukir Ahmed Noor',
        authorship: 'first-author',
        journal: 'Depression and Anxiety',
        year: 2025,
        doi: '10.1155/da/9942669',
        url: 'https://doi.org/10.1155/da/9942669',
        citations: 0
    },
    {
        title: 'Determinants of Multimorbidity in a Low-resource Setting: A Population-based Cross-sectional Study in Bangladesh',
        authors: 'Syed Toukir Ahmed Noor',
        authorship: 'first-author',
        journal: 'Global Health, Epidemiology and Genomics',
        year: 2025,
        doi: '10.1155/ghe3/2909466',
        url: 'https://doi.org/10.1155/ghe3/2909466',
        citations: 0
    },
    {
        title: 'Anxiety and depression among reproductive-aged women in Bangladesh: burden, determinants, and care-seeking practices based on a nationally representative demographic and health survey',
        authors: 'Syed Toukir Ahmed Noor et al.',
        authorship: 'co-author',
        journal: 'Archives of Women\'s Mental Health',
        year: 2025,
        doi: '10.1007/s00737-025-01564-3',
        url: 'https://doi.org/10.1007/s00737-025-01564-3',
        citations: 0
    },
    {
        title: 'Validation of modified COVID-19 Phobia Scale (MC19P-SE) to examine the relationships between corona anxiety and COVID-19 symptoms: A case-control study',
        authors: 'Syed Toukir Ahmed Noor et al.',
        authorship: 'first-author',
        journal: 'Journal of Mood & Anxiety Disorders',
        year: 2025,
        doi: '10.1016/j.xjmad.2025.100108',
        url: 'https://doi.org/10.1016/j.xjmad.2025.100108',
        citations: 0
    },
    {
        title: 'The proper application of logistic regression model in complex survey data: a systematic review',
        authors: 'Syed Toukir Ahmed Noor et al.',
        authorship: 'co-author',
        journal: 'BMC Medical Research Methodology',
        year: 2025,
        doi: '10.1186/s12874-024-02454-5',
        url: 'https://doi.org/10.1186/s12874-024-02454-5',
        citations: 0
    },
    {
        title: 'Assessing health systems\' capacities to provide post-abortion care: insights from seven low- and middle-income countries',
        authors: 'Syed Toukir Ahmed Noor et al.',
        authorship: 'co-author',
        journal: 'Journal of Global Health',
        year: 2025,
        doi: '10.7189/jogh.15.04020',
        url: 'https://doi.org/10.7189/jogh.15.04020',
        citations: 0
    },
    {
        title: 'Burden of disease scenarios for 204 countries and territories, 2022–2050: a forecasting analysis for the Global Burden of Disease Study 2021',
        authors: 'Syed Toukir Ahmed Noor et al.',
        authorship: 'other',
        journal: 'The Lancet',
        year: 2024,
        doi: '10.1016/s0140-6736(24)00685-8',
        url: 'https://doi.org/10.1016/s0140-6736(24)00685-8',
        citations: 150
    },
    {
        title: 'Association between Global Monkeypox Cases and Meteorological Factors',
        authors: 'Syed Toukir Ahmed Noor et al.',
        authorship: 'co-author',
        journal: 'International Journal of Environmental Research and Public Health',
        year: 2022,
        doi: '10.3390/ijerph192315638',
        url: 'https://doi.org/10.3390/ijerph192315638',
        citations: 25
    }
];

let currentFilter = 'all';

// ============================================
// ANIMATION OBSERVER SETUP
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add CSS for fadeInUp animation if not already present
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .publication-item,
    .award-card,
    .skill-category,
    .interest-card {
        opacity: 0;
    }
`;
document.head.appendChild(animationStyle);

/**
 * Filter and search publications
 */
function filterPublications() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filtered = publicationData.filter(pub => {
        const matchesSearch = pub.title.toLowerCase().includes(searchTerm) || 
                             pub.journal.toLowerCase().includes(searchTerm) ||
                             pub.authors.toLowerCase().includes(searchTerm);
        
        const matchesFilter = currentFilter === 'all' || pub.authorship === currentFilter;
        
        return matchesSearch && matchesFilter;
    });

    displayFilteredPublications(filtered);
}

/**
 * Display filtered publications
 */
function displayFilteredPublications(filtered) {
    if (!publicationsList) return;

    if (filtered.length === 0) {
        publicationsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-light); grid-column: 1/-1;">No publications match your search criteria.</p>';
        return;
    }

    publicationsList.innerHTML = filtered.map(pub => createPublicationHTML(pub)).join('');
    
    // Reattach observer to newly created publication items
    attachPublicationAnimations();
}

/**
 * Attach animations to publication items
 */
function attachPublicationAnimations() {
    if (!publicationsList) return;
    
    const items = publicationsList.querySelectorAll('.publication-item');
    items.forEach((el, index) => {
        // Add a small delay for staggered animation
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Create publication HTML element
 */
function createPublicationHTML(pub) {
    let authorRole = '';
    if (pub.authorship === 'first-author') {
        authorRole = ' (First/Corresponding Author)';
    } else if (pub.authorship === 'co-author') {
        authorRole = ' (Co-Author)';
    }

    return `
        <div class="publication-item" data-authorship="${pub.authorship}">
            <div class="publication-header">
                <h3>${pub.title}</h3>
                <span class="pub-year">${pub.year}</span>
            </div>
            <p class="pub-authors">${pub.authors}${authorRole}</p>
            <p class="pub-journal"><strong>${pub.journal}</strong></p>
            <p class="pub-doi">DOI: ${pub.doi}</p>
            <div class="pub-footer">
                <span class="citation-count">Citations: ${pub.citations}</span>
                <a href="${pub.url}" target="_blank" class="pub-link">View Paper</a>
            </div>
        </div>
    `;
}

// Event listeners for filtering
if (searchInput) {
    searchInput.addEventListener('keyup', filterPublications);
    searchInput.addEventListener('change', filterPublications);
}

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        filterPublications();
    });
});



// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name') || 'Anonymous';
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Prepare email body
        const emailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
        );

        // Use mailto link
        window.location.href = `mailto:syedtoukir86@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

        // Reset form
        contactForm.reset();
        
        // Show success message
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 3000);
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top-btn';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    font-size: 18px;
    font-weight: bold;
    z-index: 999;
    transition: all 0.3s ease;
    width: 50px;
    height: 50px;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ANALYTICS & TRACKING
// ============================================

/**
 * Track page view
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: window.location.pathname
        });
    }
}

/**
 * Track link clicks
 */
function trackLinkClick(url) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'outbound',
            event_label: url
        });
    }
}

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackLinkClick(link.href);
    });
});

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================

const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    padding: 10px 15px;
    background-color: #f0f0f0;
    color: #333;
    border: 2px solid #3b82f6;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    z-index: 999;
    transition: all 0.3s ease;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Uncomment below to enable dark mode toggle
// document.body.appendChild(darkModeToggle);

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize publications with local data
    if (publicationsList) {
        filterPublications();
    }

    // Track page view
    trackPageView();

    // Observe static elements (awards, skills, interests)
    document.querySelectorAll('.award-card, .skill-category, .interest-card').forEach(el => {
        observer.observe(el);
    });
});


// ============================================
// EXPORT TO PDF FUNCTIONALITY
// ============================================

const cvDownloadBtn = document.querySelector('a[download="cv.pdf"]');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', () => {
        trackLinkClick('cv-download');
    });
}
