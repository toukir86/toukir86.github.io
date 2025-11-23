# Personalization & Configuration Guide

## Overview

This guide explains how to customize the portfolio website for Syed Toukir Ahmed Noor or adapt it for another researcher.

---

## 1. Personal Information

### Edit Header & Hero Section

**File**: `index.html`

Find and update:

```html
<!-- Line ~120 in index.html -->
<h1>Your Full Name</h1>
<p class="title">Your Title | Your Subtitle</p>
<p class="subtitle">Your professional summary</p>
```

### Edit Contact Information

```html
<!-- Line ~140 -->
<a href="mailto:your-email@example.com" title="Email">
    <!-- SVG icon -->
</a>

<!-- Line ~180 -->
<span class="contact-label">Email:</span>
<a href="mailto:your-email@example.com">your-email@example.com</a>

<span class="contact-label">Phone:</span>
<a href="tel:+1234567890">+1 (234) 567-890</a>

<span class="contact-label">Location:</span>
<span>Your City, Country</span>

<span class="contact-label">Institution:</span>
<span>Your University/Organization</span>
```

### Edit Social Links

```html
<!-- Update href attributes for your profiles -->
<a href="https://linkedin.com/in/yourprofile" target="_blank">
<a href="https://orcid.org/0000-0000-0000-0000" target="_blank">
<a href="https://scholar.google.com/citations?user=yourID" target="_blank">
```

---

## 2. Education & Experience

### Update Education

**File**: `index.html` (Lines ~280-320)

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Your Degree (e.g., PhD, MSc)</h3>
        <p class="institution">University Name</p>
        <p class="period">Start Month Year – End Month Year</p>
        <p class="details">Location | GPA/CGPA info</p>
        <p class="thesis"><strong>Thesis:</strong> Your thesis title</p>
    </div>
</div>
```

### Update Work Experience

**File**: `index.html` (Lines ~330-400)

```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <h3>Your Job Title</h3>
        <p class="institution">Organization Name</p>
        <p class="period">Start Month Year – End Month Year</p>
        <p class="location">City, Country</p>
        <ul class="responsibilities">
            <li>Your responsibility here</li>
            <li>Another responsibility</li>
            <li>Third responsibility</li>
        </ul>
    </div>
</div>
```

---

## 3. Publications

### Update Publications List

**File**: `js/main.js` (Lines ~20-180)

```javascript
const publicationData = [
    {
        title: 'Your Paper Title',
        authors: 'Your Name, Colleague Name, etc.',
        authorship: 'first-author',  // Options: 'first-author', 'co-author', 'other'
        journal: 'Journal Name',
        year: 2025,
        doi: '10.1234/example.doi',
        url: 'https://doi.org/10.1234/example.doi',
        citations: 0  // Will be updated from Google Scholar
    },
    // Add more publications...
];
```

### Add New Publication

```javascript
{
    title: 'Your New Paper Title',
    authors: 'Your Name et al.',
    authorship: 'first-author',
    journal: 'Journal of Your Field',
    year: 2025,
    doi: '10.1234/newpaper',
    url: 'https://doi.org/10.1234/newpaper',
    citations: 5  // Or leave as 0 to auto-fetch
}
```

---

## 4. Research Interests

### Update Research Areas

**File**: `index.html` (Lines ~230-280)

```html
<div class="interest-card">
    <h3>Your Research Topic</h3>
    <p>Brief description of your research area</p>
</div>
```

Example:
```html
<div class="interest-card">
    <h3>Machine Learning</h3>
    <p>Deep learning applications in healthcare diagnostics</p>
</div>
```

---

## 5. Skills

### Update Skills Section

**File**: `index.html` (Lines ~750-820)

```html
<div class="skill-category">
    <h3>Your Skill Category</h3>
    <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
    </ul>
</div>
```

Example:
```html
<div class="skill-category">
    <h3>Programming Languages</h3>
    <ul>
        <li>Python</li>
        <li>R</li>
        <li>Julia</li>
    </ul>
</div>
```

---

## 6. Awards & Honors

### Update Awards

**File**: `index.html` (Lines ~670-720)

```html
<div class="award-card">
    <div class="award-icon">🏆</div>
    <h3>Award Name</h3>
    <p>Organization that gave the award</p>
</div>
```

---

## 7. Professional Service

### Update Service & Leadership

**File**: `index.html` (Lines ~830-870)

```html
<div class="service-card">
    <h3>Your Role/Service</h3>
    <p>Description of your service</p>
</div>

<!-- Or for lists: -->
<div class="service-card">
    <h3>Peer Review</h3>
    <ul>
        <li><strong>Journal A</strong> - Reviewer since 2020</li>
        <li><strong>Journal B</strong> - Associate Editor</li>
    </ul>
</div>
```

---

## 8. Website Styling

### Change Color Scheme

**File**: `css/styles.css` (Lines ~1-20)

```css
:root {
    /* Primary color (headers, main elements) */
    --primary-color: #1e3a8a;      /* Dark blue */
    
    /* Secondary color (accents, links) */
    --secondary-color: #3b82f6;    /* Blue */
    
    /* Accent color (highlights, buttons) */
    --accent-color: #06b6d4;       /* Cyan */
    
    /* Background colors */
    --dark-bg: #0f172a;
    --light-bg: #f8fafc;
    
    /* Text colors */
    --text-dark: #1e293b;
    --text-light: #64748b;
    
    /* Other colors */
    --border-color: #e2e8f0;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Color Examples

Professional Dark Blue:
```css
--primary-color: #0f3460;
--secondary-color: #16213e;
--accent-color: #e94560;
```

Green (Science):
```css
--primary-color: #2d5016;
--secondary-color: #3a7d44;
--accent-color: #6eb569;
```

Purple (Tech):
```css
--primary-color: #4b0082;
--secondary-color: #7851a9;
--accent-color: #c854d9;
```

### Change Font

**File**: `css/styles.css` (Lines ~25)

```css
body {
    font-family: 'Your Font Name', sans-serif;
}
```

Available fonts:
- Georgia (serif, traditional)
- 'Times New Roman' (serif, classic)
- Verdana (clean sans-serif)
- Courier New (monospace)
- 'Trebuchet MS' (modern sans-serif)

Or use Google Fonts in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
```

Then use:
```css
:root {
    font-family: 'Lato', sans-serif;
}

h1, h2, h3 {
    font-family: 'Playfair Display', serif;
}
```

---

## 9. Google Scholar Integration

### Set Your Scholar ID

**File**: `.env`

```env
SCHOLAR_ID=your_google_scholar_id_here
```

**How to find your Scholar ID:**
1. Go to https://scholar.google.com/citations
2. Click your profile
3. Copy ID from URL: `https://scholar.google.com/citations?user=**XXXXX**`

### Configure Update Schedule

**File**: `backend/server.js` (Line ~290)

Current: Weekly (Sunday at midnight)
```javascript
cron.schedule('0 0 * * 0', async () => {
    // Updates every Sunday at 00:00
});
```

Change to every 6 hours:
```javascript
cron.schedule('0 */6 * * *', async () => {
    // Updates every 6 hours
});
```

Cron syntax: `'minute hour day month weekday'`
- `*` = every
- `*/N` = every N units
- `0 0 * * 1` = Monday midnight
- `0 9,17 * * *` = 9 AM and 5 PM daily

---

## 10. About Section

### Update Bio

**File**: `index.html` (Lines ~195-210)

```html
<section id="about" class="about">
    <div class="container">
        <h2>About Me</h2>
        <p>Write your professional bio here. Include:</p>
        <p>- Your current position and institution</p>
        <p>- Your research focus areas</p>
        <p>- Key achievements and contributions</p>
    </div>
</section>
```

---

## 11. Download CV/Resume

### Add PDF Download

1. Place your CV file in `assets/` folder
2. Update download link in `index.html` (Line ~149):

```html
<a href="assets/your-cv.pdf" class="btn btn-secondary" download>Download CV</a>
```

---

## 12. Contact Form

### Update Email Address

**File**: `index.html` (Lines ~870-880)

```html
<a href="mailto:your-email@example.com">your-email@example.com</a>
```

### Setup Email Notifications (Optional)

**File**: `.env`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_TO=recipient@example.com
```

---

## 13. Favicon & Meta Data

### Update Page Title

**File**: `index.html` (Line ~7)

```html
<title>Your Name - Academic Portfolio</title>
```

### Update Meta Description

**File**: `index.html` (Line ~8)

```html
<meta name="description" content="Your professional summary - research focus, qualifications, etc.">
```

### Add Favicon

1. Create or find a favicon (16x16 or 32x32 PNG)
2. Place in `assets/favicon.ico`
3. Link is already in `index.html` (Line ~13)

---

## 14. Content for Different Fields

### For Computer Scientists

```html
<h2>Research Interests</h2>
<div class="interests-grid">
    <div class="interest-card">
        <h3>Artificial Intelligence</h3>
        <p>Deep learning and neural networks</p>
    </div>
    <div class="interest-card">
        <h3>Computer Vision</h3>
        <p>Image recognition and object detection</p>
    </div>
    <!-- etc. -->
</div>
```

### For Medical Researchers

```html
<h2>Research Interests</h2>
<div class="interests-grid">
    <div class="interest-card">
        <h3>Clinical Trials</h3>
        <p>Experimental design and patient outcomes</p>
    </div>
    <div class="interest-card">
        <h3>Genomics</h3>
        <p>Genetic markers and disease association</p>
    </div>
    <!-- etc. -->
</div>
```

### For Economists

```html
<h2>Research Interests</h2>
<div class="interests-grid">
    <div class="interest-card">
        <h3>Econometrics</h3>
        <p>Causal inference and time series analysis</p>
    </div>
    <div class="interest-card">
        <h3>Development Economics</h3>
        <p>Policy evaluation in emerging markets</p>
    </div>
    <!-- etc. -->
</div>
```

---

## 15. Adding New Sections

### Template for New Section

```html
<section id="section-id" class="section-name">
    <div class="container">
        <h2>Section Title</h2>
        <!-- Your content here -->
    </div>
</section>
```

### Add to Navigation

**File**: `index.html` (Lines ~40-50)

```html
<ul class="nav-menu">
    <li><a href="#section-id" class="nav-link">Section Name</a></li>
    <!-- existing items -->
</ul>
```

### Style in CSS

**File**: `css/styles.css` (end of file)

```css
.section-name {
    background-color: var(--light-bg);
    padding: 80px 0;
}

.section-name h3 {
    color: var(--primary-color);
}
```

---

## Checklist for Customization

- [ ] Update name and title
- [ ] Update contact information
- [ ] Update social media links
- [ ] Add education history
- [ ] Add work experience
- [ ] Update publications list
- [ ] Add research interests
- [ ] Add skills
- [ ] Add awards
- [ ] Update about section
- [ ] Add CV/resume PDF
- [ ] Set Google Scholar ID
- [ ] Test all links
- [ ] Check mobile responsiveness
- [ ] Deploy to web server

---

## Testing

### Check Locally

```bash
npm start
# Open http://localhost:3000
```

### Test Responsiveness

1. Open DevTools (F12)
2. Click Device Toolbar
3. Test on multiple screen sizes

### Validate HTML

Go to https://validator.w3.org and paste your HTML

### Test Speed

Use https://pagespeed.web.dev to check performance

---

## Need Help?

- See README.md for technical details
- See QUICK_START.md for setup help
- Check index.html comments for specific lines
- Email: syedtoukir86@gmail.com

---

**Version**: 1.0  
**Last Updated**: November 2025
