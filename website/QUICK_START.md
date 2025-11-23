# Quick Start Guide - Academic Portfolio Website

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies

```bash
# Navigate to website folder
cd website

# Install Node packages
npm install

# Install Python packages
pip install scholarly selenium beautifulsoup4
```

### Step 2: Configure

```bash
# Copy environment template
copy .env.example .env

# Edit .env with your Google Scholar ID
# SCHOLAR_ID=your_id_here
```

### Step 3: Run

```bash
npm start
```

Open http://localhost:3000 in your browser.

---

## 📚 Finding Your Google Scholar ID

1. Go to https://scholar.google.com/citations
2. Click on your profile name
3. Look at the URL: `https://scholar.google.com/citations?user=**XXXXX**`
4. Copy the ID part (XXXXX)
5. Add to `.env`: `SCHOLAR_ID=XXXXX`

---

## 🔧 Common Tasks

### Change Colors

Edit `css/styles.css` - look for `:root` section:

```css
:root {
    --primary-color: #1e3a8a;      /* Change this */
    --secondary-color: #3b82f6;    /* And this */
    --accent-color: #06b6d4;       /* And this */
}
```

### Update Personal Info

Edit `index.html`:
- Name, title, contact info in `<header>`
- About section
- Education dates
- Work experience
- Skills

### Add Custom Publications

Edit `js/main.js` - find `publicationData` array:

```javascript
{
    title: 'Your Paper Title',
    authors: 'Your Name et al.',
    authorship: 'first-author',  // or 'co-author'
    journal: 'Journal Name',
    year: 2025,
    doi: '10.1234/example',
    url: 'https://doi.org/...',
    citations: 42
}
```

### Deploy Online

**Heroku (easiest):**
```bash
npm install -g heroku
heroku login
heroku create your-app-name
heroku config:set SCHOLAR_ID=your_id
git push heroku main
```

**Other options:**
- Vercel (for frontend only)
- Netlify (for frontend only)
- AWS, Azure, DigitalOcean (for full stack)

---

## 📊 Understanding the Architecture

```
Frontend (HTML/CSS/JS)
    ↓
Express API (Node.js)
    ↓
Google Scholar Scraper (Python)
    ↓
Google Scholar Website
```

### Data Flow:
1. User clicks "Refresh" or page loads
2. Frontend calls `/api/publications`
3. Backend runs Python scraper
4. Python fetches data from Google Scholar
5. Data returned to frontend
6. Frontend displays and caches results

### Caching:
- Browser localStorage: 7 days
- Server memory: 7 days
- Automatic weekly refresh

---

## 🎨 Customization Examples

### Change Font

In `css/styles.css`:
```css
body {
    font-family: 'Segoe UI', Trebuchet MS, sans-serif;  /* Change this */
}
```

### Add Portfolio Projects

Add new section in `index.html`:
```html
<section class="projects">
    <div class="container">
        <h2>Projects</h2>
        <!-- Add project cards -->
    </div>
</section>
```

### Add Dark Mode

Uncomment dark mode toggle in `js/main.js`:
```javascript
// Uncomment this line (around line 250)
document.body.appendChild(darkModeToggle);
```

### Change Publication Sorting

Edit `js/main.js` - modify `filterPublications()` function:
```javascript
// Sort by citations (descending)
filtered.sort((a, b) => b.citations - a.citations);
```

---

## 🐛 Debug Mode

### Enable Console Logging

Edit `js/scholar-integration.js` - add more `console.log()`:

```javascript
async loadPublications() {
    console.log('Loading publications for:', this.scholarId);
    // ... rest of code
}
```

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Perform action (refresh publications)
4. See all API calls and responses

### Test API Directly

```bash
# Test publication fetch
curl -X POST http://localhost:3000/api/publications \
  -H "Content-Type: application/json" \
  -d '{"scholarId":"your_id"}'

# Get current Scholar ID
curl http://localhost:3000/api/scholar-id
```

---

## 📱 Mobile Testing

### Test Responsiveness

1. Open DevTools (F12)
2. Click device toolbar icon
3. Select different devices (iPhone, iPad, etc.)
4. Check layout adapts

### Test on Real Phone

```bash
# Find your computer IP
ipconfig getifaddr en0  # macOS
ipconfig  # Windows

# Access from phone
http://YOUR_IP:3000
```

---

## 🚀 Performance Tips

### Image Optimization
- Use WebP format for images
- Compress PNG/JPG with TinyPNG
- Use responsive images with `srcset`

### Code Minification
For production:
```bash
npm install -g terser
terser js/main.js -o js/main.min.js
```

### Enable GZIP Compression
Add to `server.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

---

## ❓ FAQ

**Q: How often is data updated?**  
A: Automatically every Sunday at midnight. Click refresh button for instant update.

**Q: Can I use without Google Scholar?**  
A: Yes! Static publications load from fallback data in `js/main.js`.

**Q: How do I change the update schedule?**  
A: Edit cron expression in `server.js` (line ~290).

**Q: Can I export publications as BibTeX?**  
A: Add this feature by modifying publication display in HTML.

**Q: How do I add a resume PDF download?**  
A: Add your resume to `assets/` folder and link it:
```html
<a href="assets/resume.pdf" download>Download Resume</a>
```

**Q: Can I add a blog section?**  
A: Yes! Add new section with blog posts, stored as JSON or database.

**Q: Is my data secure?**  
A: Yes. No private data stored. Only public Scholar info fetched.

---

## 🎓 Next Steps

1. **Customize**: Edit colors, fonts, personal info
2. **Deploy**: Push to production
3. **Monitor**: Check analytics
4. **Maintain**: Update CV regularly
5. **Share**: Share your portfolio!

---

## 📞 Support

- **Issues**: Check README.md and this guide
- **Google Scholar Help**: https://support.google.com/scholar
- **Email**: syedtoukir86@gmail.com

---

**Happy Coding! 🚀**

For detailed info, see `README.md`
