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
    // ============ FIRST AUTHOR PUBLICATIONS ============
    {
    title: 'Machine learning-based prediction of maternal continuum of care completion: Evidence from Bangladesh Demographic and Health Survey 2022',
    authors: '<strong>Noor STA</strong>, Islam RB, Yeasar S, & Siddique S',
    authorship: 'first-author',
    journal: 'Array',
    year: 2025,
    doi: '10.1016/j.array.2025.100666',
    url: 'https://doi.org/10.1016/j.array.2025.100666'
},
{
    title: 'Factors associated with early initiation of antenatal care in Bangladesh: a survival analysis using Bangladesh Demographic and Health Survey 2022',
    authors: 'Islam MS, <strong>Noor STA</strong>, Asha RA, Islam RB, & Rahman F',
    authorship: 'first-author',
    journal: 'BMJ Open',
    year: 2026,
    doi: '10.1136/bmjopen-2024-104709',
    url: 'https://bmjopen.bmj.com/content/16/1/e104709'
},

    {
        title: 'Exploring mental health disparities in Mozambique: Depression and anxiety symptoms among reproductive-aged women using data from Mozambique Demographic and Health Survey 2022-23',
        authors: '<strong>Noor STA</strong>, Siddique S, Das O, Yeasar S, & Islam RB',
        authorship: 'first-author',
        journal: 'Global Epidemiology',
        year: 2025,
        doi: '10.1016/j.gloepi.2025.100223',
        url: 'https://doi.org/10.1016/j.gloepi.2025.100223'
    },
    {
        title: 'The association of cyberbullying with major depressive disorders among Bangladeshi female adolescents: findings from the Bangladesh adolescent health and wellbeing survey 2019-20',
        authors: '<strong>Noor STA</strong>, Islam MF, Hossain MS, Islam RB, Banik R, Shiblee SI, Nasrullah SM, & Raza S',
        authorship: 'first-author',
        journal: 'BMC Psychiatry',
        year: 2025,
        doi: '10.1186/s12888-025-07234-z',
        url: 'https://doi.org/10.1186/s12888-025-07234-z'
    },
    {
        title: 'Prevalence, Determinants and Wealth-Related Inequality of Anxiety and Depression Symptoms Among Reproductive-Aged Women (15-49 Years) in Nepal: An Analysis of Nationally Representative Nepal Demographic and Health Survey Data 2022',
        authors: '<strong>Noor STA</strong>, Yeasar S, Siddique S, Banik R, & Raza S',
        authorship: 'first-author',
        journal: 'Depression and Anxiety',
        year: 2025,
        doi: '10.1155/da/9942669',
        url: 'https://doi.org/10.1155/da/9942669'
    },
    {
        title: 'Determinants of Multimorbidity in a Low-resource Setting: A Population-based Cross-sectional Study in Bangladesh',
        authors: '<strong>Noor STA</strong>, Kawsar LA, & Bhuia MR',
        authorship: 'first-author',
        journal: 'Global Health, Epidemiology and Genomics',
        year: 2025,
        doi: '10.1155/ghe3/2909466',
        url: 'https://doi.org/10.1155/ghe3/2909466'
    },
    
    {
        title: 'Exploring Factors Influencing Wealth-Related Disparities in Institutional Delivery: A Decomposition Analysis Using Bangladesh Multiple Indicator Cluster Survey (MICS) 2019',
        authors: '<strong>Noor STA</strong>, Shil P, Talukdar A, Aktar S, & Uddin MJ',
        authorship: 'first-author',
        journal: 'Public Health Challenges',
        year: 2025,
        doi: '10.1002/puh2.70066',
        url: 'https://doi.org/10.1002/puh2.70066'
    },

    // ============ CO-AUTHOR PUBLICATIONS ============
    {
        title: 'Assessing changes in the availability and readiness of health facilities to provide modern family planning services in Bangladesh: Insights from Bangladesh Health Facility Surveys, 2014 and 2017',
        authors: 'Banik R, <strong>Noor STA</strong>, Siddique AB, Mayen MSA, Saha A, Ashiquzzaman, Hossain L, Sayeed A, Saha N, Al-Zubayer MA, Kader ML, Akter E, Siddique MAB, Ahmed A, & Raza S',
        authorship: 'co-author',
        journal: 'PLoS One',
        year: 2025,
        doi: '10.1371/journal.pone.0334520',
        url: 'https://doi.org/10.1371/journal.pone.0334520'
    },
    {
        title: 'Assessing health systems\' capacities to provide post-abortion care: insights from seven low- and middle-income countries',
        authors: 'Raza S, Banik R, <strong>Noor STA</strong>, Jahan E, Sayeed A, Huq N, El Arifeen S, Ahmed A, & Rahman AE',
        authorship: 'co-author',
        journal: 'Journal of Global Health',
        year: 2025,
        doi: '10.7189/jogh.15.04020',
        url: 'https://doi.org/10.7189/jogh.15.04020'
    },
    {
        title: 'The proper application of logistic regression model in complex survey data: a systematic review',
        authors: 'Dey D, Haque MS, Islam MM, Aishi UI, Shammy SS, Mayen MSA, <strong>Noor STA</strong>, & Uddin MJ',
        authorship: 'co-author',
        journal: 'BMC Medical Research Methodology',
        year: 2025,
        doi: '10.1186/s12874-024-02454-5',
        url: 'https://doi.org/10.1186/s12874-024-02454-5'
    },
    {
        title: 'Anxiety and depression among reproductive-aged women in Bangladesh: burden, determinants, and care-seeking practices based on a nationally representative demographic and health survey',
        authors: 'Raza S, Banik R, <strong>Noor STA</strong>, Sayeed A, Saha A, Jahan E, Ashiquzzaman, Siddique MAB, Ahmed A, & Rahman AE',
        authorship: 'co-author',
        journal: 'Archives of Women\'s Mental Health',
        year: 2025,
        doi: '10.1007/s00737-025-01564-3',
        url: 'https://doi.org/10.1007/s00737-025-01564-3'
    },
    {
        title: 'Association between Global Monkeypox Cases and Meteorological Factors',
        authors: 'Islam MA, Sangkham S, Tiwari A, Vadiati M, Hasan MN, <strong>Noor STA</strong>, Mumin J, Bhattacharya P, & Sherchan SP',
        authorship: 'co-author',
        journal: 'International Journal of Environmental Research and Public Health',
        year: 2022,
        doi: '10.3390/ijerph192315638',
        url: 'https://doi.org/10.3390/ijerph192315638'
    },
    {
        title: 'Validation of modified COVID-19 Phobia Scale (MC19P-SE) to examine the relationships between corona anxiety and COVID-19 symptoms: A case-control study',
        authors: 'Kawsar LA, <strong>Noor STA</strong>, Islam MA, & Bhuia MR',
        authorship: 'co-author',
        journal: 'Journal of Mood & Anxiety Disorders',
        year: 2025,
        doi: '10.1016/j.xjmad.2025.100108',
        url: 'https://doi.org/10.1016/j.xjmad.2025.100108'
    },
    {
        title: 'An Estimation of Five-decade Long Monkeypox Case Fatality Rate: Systematic Review and Meta-analysis',
        authors: 'Islam MA, Ahammed T, <strong>Noor STA</strong>, Hasan MN, Hoque MN, Tiwari A, Harapan H, Dhama K, Islam T, & Bhattacharya P',
        authorship: 'co-author',
        journal: 'Journal of Pure and Applied Microbiology',
        year: 2022,
        doi: '10.22207/JPAM.16.SPL1.16',
        url: 'https://doi.org/10.22207/JPAM.16.SPL1.16'
    },

    // ============ GBD COLLABORATION PUBLICATIONS ============
    {
        title: 'Global, regional, and national prevalence of child and adolescent overweight and obesity, 1990-2021, with forecasts to 2050: a forecasting study for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Adolescent BMI Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)00397-6',
        url: 'https://doi.org/10.1016/S0140-6736(25)00397-6'
    },
    {
        title: 'Global, regional, and national prevalence of adult overweight and obesity, 1990-2021, with forecasts to 2050: a forecasting study for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Adult BMI Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)00355-1',
        url: 'https://doi.org/10.1016/S0140-6736(25)00355-1'
    },
    {
        title: 'The global, regional, and national burden of cancer, 1990-2023, with forecasts to 2050: a systematic analysis for the Global Burden of Disease Study 2023',
        authors: 'GBD 2023 Cancer Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)01635-6',
        url: 'https://doi.org/10.1016/S0140-6736(25)01635-6'
    },
    {
        title: 'Global, regional, and national trends in routine childhood vaccination coverage from 1980 to 2023 with forecasts to 2030: a systematic analysis for the Global Burden of Disease Study 2023',
        authors: 'GBD 2023 Vaccine Coverage Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)01037-2',
        url: 'https://doi.org/10.1016/S0140-6736(25)01037-2'
    },
    {
        title: 'Burden of disease scenarios by state in the USA, 2022-50: a forecasting analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 US Burden of Disease and Forecasting Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2024,
        doi: '10.1016/S0140-6736(24)02246-3',
        url: 'https://doi.org/10.1016/S0140-6736(24)02246-3'
    },
    {
        title: 'Global burden of vision impairment due to age-related macular degeneration, 1990-2021, with forecasts to 2050: a systematic analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Global AMD Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Global Health',
        year: 2025,
        doi: '10.1016/S2214-109X(25)00143-3',
        url: 'https://doi.org/10.1016/S2214-109X(25)00143-3'
    },
    {
        title: 'Global, regional, and national sepsis incidence and mortality, 1990-2021: a systematic analysis',
        authors: 'GBD 2021 Global Sepsis Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Global Health',
        year: 2025,
        doi: '10.1016/S2214-109X(25)00356-0',
        url: 'https://doi.org/10.1016/S2214-109X(25)00356-0'
    },
    {
        title: 'Global burden of 292 causes of death in 204 countries and territories and 660 subnational locations, 1990-2023: a systematic analysis for the Global Burden of Disease Study 2023',
        authors: 'GBD 2023 Causes of Death Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)01917-8',
        url: 'https://doi.org/10.1016/S0140-6736(25)01917-8'
    },
    {
        title: 'Global age-sex-specific all-cause mortality and life expectancy estimates for 204 countries and territories and 660 subnational locations, 1950-2023: a demographic analysis for the Global Burden of Disease Study 2023',
        authors: 'GBD 2023 Demographics Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)01330-3',
        url: 'https://doi.org/10.1016/S0140-6736(25)01330-3'
    },
    {
        title: 'Burden of 375 diseases and injuries, risk-attributable burden of 88 risk factors, and healthy life expectancy in 204 countries and territories, including 660 subnational locations, 1990-2023: a systematic analysis for the Global Burden of Disease Study 2023',
        authors: 'GBD 2023 Disease and Injury and Risk Factor Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(25)01637-X',
        url: 'https://doi.org/10.1016/S0140-6736(25)01637-X'
    },
    {
        title: 'Asthma and Atopic Dermatitis in Asia, 1990-2021: The Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Asia Allergic Disorders Collaborators',
        authorship: 'gbd',
        journal: 'Clinical & Experimental Allergy',
        year: 2025,
        doi: '10.1111/cea.70024',
        url: 'https://doi.org/10.1111/cea.70024'
    },
    {
        title: 'Global, regional and national burden of dietary iron deficiency from 1990 to 2021: a Global Burden of Disease study',
        authors: 'Lee S, Son Y, Hwang J, Kim MS; GBD 2021 Dietary Iron Deficiency Collaborators; Il Shin J, Yon DK, & Kassebaum NJ',
        authorship: 'gbd',
        journal: 'Nature Medicine',
        year: 2025,
        doi: '10.1038/s41591-025-03624-8',
        url: 'https://doi.org/10.1038/s41591-025-03624-8'
    },
    {
        title: 'Global, regional, and national burden of asthma and atopic dermatitis, 1990-2021, and projections to 2050: a systematic analysis of the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Asthma and Allergic Diseases Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Respiratory Medicine',
        year: 2025,
        doi: '10.1016/S2213-2600(25)00003-7',
        url: 'https://doi.org/10.1016/S2213-2600(25)00003-7'
    },
    {
        title: 'Global, regional, and national burden of household air pollution, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 HAP Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2025,
        doi: '10.1016/S0140-6736(24)02840-X',
        url: 'https://doi.org/10.1016/S0140-6736(24)02840-X'
    },
    {
        title: 'Changing life expectancy in European countries 1990-2021: a subanalysis of causes and risk factors from the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Europe Life Expectancy Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Public Health',
        year: 2025,
        doi: '10.1016/S2468-2667(25)00009-X',
        url: 'https://doi.org/10.1016/S2468-2667(25)00009-X'
    },
    {
        title: 'Global, regional, and national age-sex-specific burden of diarrhoeal diseases, their risk factors, and aetiologies, 1990-2021, for 204 countries and territories: a systematic analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Diarrhoeal Diseases Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Infectious Diseases',
        year: 2025,
        doi: '10.1016/S1473-3099(24)00691-1',
        url: 'https://doi.org/10.1016/S1473-3099(24)00691-1'
    },
    {
        title: 'The burden of diseases, injuries, and risk factors by state in the USA, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 US Burden of Disease Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2024,
        doi: '10.1016/S0140-6736(24)01446-6',
        url: 'https://doi.org/10.1016/S0140-6736(24)01446-6'
    },
    {
        title: 'Global, regional, and national burden of HIV/AIDS, 1990-2021, and forecasts to 2050, for 204 countries and territories: the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 HIV Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet HIV',
        year: 2024,
        doi: '10.1016/S2352-3018(24)00212-1',
        url: 'https://doi.org/10.1016/S2352-3018(24)00212-1'
    },
    {
        title: 'National-level and state-level prevalence of overweight and obesity among children, adolescents, and adults in the USA, 1990-2021, and forecasts up to 2050',
        authors: 'GBD 2021 US Obesity Forecasting Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2024,
        doi: '10.1016/S0140-6736(24)01548-4',
        url: 'https://doi.org/10.1016/S0140-6736(24)01548-4'
    },
    {
        title: 'Forecasting the effects of smoking prevalence scenarios on years of life lost and life expectancy from 2022 to 2050: a systematic analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Tobacco Forecasting Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Public Health',
        year: 2024,
        doi: '10.1016/S2468-2667(24)00166-X',
        url: 'https://doi.org/10.1016/S2468-2667(24)00166-X'
    },
    {
        title: 'Global, regional, and national burden of stroke and its risk factors, 1990-2021: a systematic analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Stroke Risk Factor Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet Neurology',
        year: 2024,
        doi: '10.1016/S1474-4422(24)00369-7',
        url: 'https://doi.org/10.1016/S1474-4422(24)00369-7'
    },
    {
        title: 'Burden of disease scenarios for 204 countries and territories, 2022-2050: a forecasting analysis for the Global Burden of Disease Study 2021',
        authors: 'GBD 2021 Forecasting Collaborators',
        authorship: 'gbd',
        journal: 'The Lancet',
        year: 2024,
        doi: '10.1016/S0140-6736(24)00685-8',
        url: 'https://doi.org/10.1016/S0140-6736(24)00685-8'
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

    // Re-render Dimensions badges for newly inserted HTML
    if (window.__dimensions_embed && typeof window.__dimensions_embed.addBadges === 'function') {
        window.__dimensions_embed.addBadges();
    }
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
 * Create publication HTML element with badge
 */
function createPublicationHTML(pub) {
    let badge = '';
    let badgeClass = '';
    
    if (pub.authorship === 'first-author') {
        badge = '1st Author';
        badgeClass = 'first-author';
    } else if (pub.authorship === 'co-author') {
        badge = 'Co-author';
        badgeClass = 'co-author';
    } else if (pub.authorship === 'gbd') {
        badge = 'GBD Collaborator';
        badgeClass = 'gbd';
    }

    return `
        <div class="publication-item" data-authorship="${pub.authorship}">
            <div class="publication-header">
                <h3>${pub.title}</h3>
                <span class="pub-year">${pub.year}</span>
            </div>
            <p class="pub-authors">${pub.authors}</p>
            <p class="pub-journal"><strong>${pub.journal}</strong></p>
            <p class="pub-doi">DOI: ${pub.doi}</p>
            <div class="pub-footer">
                <span class="pub-badge ${badgeClass}">${badge}</span>
                <a href="${pub.url}" target="_blank" class="pub-link">View Paper</a>
            </div>
        </div>
    `;
}

// Initialize publications on page load
document.addEventListener('DOMContentLoaded', () => {
    filterPublications();
});

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
