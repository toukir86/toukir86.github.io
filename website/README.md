# Academic Portfolio Website - Setup & Deployment Guide

## Overview

This is a professional academic portfolio website for Syed Toukir Ahmed Noor, integrating Google Scholar to automatically display publications, citation metrics, and research impact.

### Features

✅ **Responsive Design** - Mobile, tablet, and desktop optimization  
✅ **Google Scholar Integration** - Auto-fetch publications and metrics  
✅ **Publication Management** - Search, filter, and display research  
✅ **Citation Analytics** - Track h-index, total citations, and trends  
✅ **Professional Layout** - CV-based structure with academic styling  
✅ **SEO Optimized** - Meta tags, structured data, and fast loading  
✅ **Automated Updates** - Weekly sync with Google Scholar  
✅ **Dark Mode Ready** - Easy customization  

---

## Project Structure

```
website/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # Complete styling
├── js/
│   ├── main.js               # UI interactions and forms
│   └── scholar-integration.js # Google Scholar API client
├── assets/                    # Images, documents
├── backend/
│   ├── server.js             # Express.js API server
│   └── scholar_scraper.py    # Python Google Scholar scraper
├── package.json              # Node.js dependencies
├── .env.example              # Environment variables template
├── .env                       # Configuration (create from example)
└── README.md                 # This file
```

---

## Installation & Setup

### Prerequisites

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **Python** (v3.7+) - [Download](https://www.python.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** (optional) - For version control

### Step 1: Install Dependencies

#### Backend (Node.js)

```bash
cd website
npm install
```

This installs:
- `express` - Web framework
- `axios` - HTTP client
- `cors` - Cross-origin support
- `node-cron` - Scheduled tasks
- `dotenv` - Environment variables

#### Python Requirements

```bash
pip install scholarly selenium beautifulsoup4
```

This enables Google Scholar scraping.

### Step 2: Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Find your Google Scholar ID:
   - Visit https://scholar.google.com/citations
   - Log in or view your profile
   - Your Scholar ID is in the URL: `https://scholar.google.com/citations?user=**YOUR_ID_HERE**`

3. Edit `.env`:
```env
SCHOLAR_ID=your_scholar_id_here
PORT=3000
NODE_ENV=development
```

### Step 3: Verify Installation

Test that everything works:

```bash
# Start the server
npm start
```

You should see:
```
╔═══════════════════════════════════════════╗
║  Academic Portfolio Server                ║
║  Listening on http://localhost:3000       ║
║  Scholar ID: your_scholar_id_here         ║
╚═══════════════════════════════════════════╝
```

Visit http://localhost:3000 in your browser.

---

## Configuration

### Google Scholar ID

Your Scholar ID is essential for automatic publication fetching.

**Finding your Scholar ID:**
1. Go to https://scholar.google.com/citations
2. Click on your profile
3. Look at the URL: `https://scholar.google.com/citations?user=**abc123xyz**`
4. Your ID is the `user` parameter value

**Setting it up:**
- Edit `.env` and set: `SCHOLAR_ID=abc123xyz`
- Or configure via API: `POST /api/configure` with `{"scholarId": "abc123xyz"}`

### Email Configuration (Optional)

To enable the contact form to send actual emails:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Use the generated 16-character password

### Customization

Edit these files to customize:

- **Content**: `index.html` - Update personal information
- **Styling**: `css/styles.css` - Modify colors, fonts, spacing
- **Colors**: Edit CSS variables in `styles.css`:
  ```css
  :root {
      --primary-color: #1e3a8a;
      --secondary-color: #3b82f6;
      --accent-color: #06b6d4;
      /* ... more colors ... */
  }
  ```
- **Publication Data**: Edit hardcoded publications in `js/main.js`

---

## API Endpoints

### Fetch Publications

```http
POST /api/publications
Content-Type: application/json

{
  "scholarId": "your_scholar_id"
}
```

**Response:**
```json
{
  "success": true,
  "publications": [
    {
      "title": "Paper Title",
      "authors": "Author Names",
      "journal": "Journal Name",
      "year": 2025,
      "citations": 42,
      "doi": "10.1234/example",
      "url": "https://doi.org/...",
      "authorship": "first-author"
    }
  ],
  "metrics": {
    "hIndex": 8,
    "totalCitations": 200,
    "i10Index": 6,
    "publicationCount": 10
  }
}
```

### Get Metrics

```http
GET /api/metrics?id=your_scholar_id
```

### Configure Scholar ID

```http
POST /api/configure
Content-Type: application/json

{
  "scholarId": "new_scholar_id"
}
```

### Contact Form

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Research Inquiry",
  "message": "Your message here"
}
```

---

## Automatic Updates

### Scheduled Refresh

The server automatically updates publication data **weekly** (Sunday at midnight).

Schedule is configured in `backend/server.js`:
```javascript
// Every Sunday at midnight
cron.schedule('0 0 * * 0', async () => {
    // Updates publications
});
```

**To change the schedule:**

Edit the cron expression in `server.js`. Examples:
- `'0 */6 * * *'` - Every 6 hours
- `'0 0 * * 1'` - Every Monday at midnight
- `'0 9,17 * * *'` - 9 AM and 5 PM daily

### Manual Refresh

Users can manually refresh on the website by clicking the "Refresh from Google Scholar" button.

---

## Deployment

### Local Development

```bash
npm run dev
```

Uses `nodemon` for auto-restart on file changes.

### Production Deployment

#### Option 1: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-portfolio

# Set environment variables
heroku config:set SCHOLAR_ID=your_scholar_id
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Option 2: AWS/Azure/DigitalOcean

1. Create a droplet/instance with Node.js
2. Clone your repository
3. Install dependencies: `npm install`
4. Set environment variables in `.env`
5. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js
   pm2 save
   ```

#### Option 3: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t academic-portfolio .
docker run -p 3000:3000 -e SCHOLAR_ID=your_id academic-portfolio
```

---

## Troubleshooting

### Issue: Google Scholar data not loading

**Solution:**
1. Verify Scholar ID is correct
2. Check if scholar library is installed: `pip install scholarly`
3. Check server logs for Python errors
4. Try manual refresh button
5. Fallback publications will display if scraper fails

### Issue: Server won't start

**Solution:**
```bash
# Check if port 3000 is in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Use different port
PORT=8000 npm start
```

### Issue: CORS errors on frontend

**Solution:**
- CORS is enabled by default
- If custom domain, update server.js:
  ```javascript
  app.use(cors({
      origin: 'https://yourdomain.com'
  }));
  ```

### Issue: Publications not updating

**Solution:**
1. Wait 7 days for automatic update, or
2. Click "Refresh" button on website, or
3. Restart server: `npm start`
4. Check logs for errors

### Issue: Contact form not working

**Solution:**
1. Email configuration optional (uses mailto by default)
2. For real emails, configure SMTP in `.env`
3. Test with: `curl -X POST http://localhost:3000/api/contact`

---

## Performance Optimization

### Caching

Publications are cached for 7 days to reduce API calls:
- Cache stored in browser `localStorage`
- Cache stored on server in memory
- Manual refresh clears cache

### Lazy Loading

Images and content load on demand:
- Publications load with intersection observer
- Charts load when visible

### CDN

For production, use a CDN for static assets:
```html
<!-- Add to index.html -->
<link rel="stylesheet" href="https://cdn.example.com/styles.css">
```

---

## SEO Optimization

The website includes:
- Meta tags for description, keywords, author
- Open Graph tags for social sharing
- Structured data for search engines
- Sitemap (generate with `npm run build-sitemap`)
- Robots.txt in assets folder

### To improve SEO further:

1. Submit to Google Search Console
2. Create XML sitemap
3. Add breadcrumb schema
4. Optimize images with alt text
5. Ensure fast page load (Core Web Vitals)

---

## Maintenance

### Regular Tasks

- **Weekly**: Monitor automatic updates (check logs)
- **Monthly**: Review publication data for accuracy
- **Quarterly**: Update CV/resume
- **Annually**: Renew SSL certificate (if HTTPS)

### Monitoring

Monitor server health:
```bash
# Check uptime with pm2
pm2 monit

# View logs
pm2 logs

# Or use external services:
# - Uptime Robot
# - New Relic
# - DataDog
```

---

## Advanced Configuration

### Custom Publication Scraper

Replace `scholarly` with custom implementation in `scholar_scraper.py`:

```python
# Example: Use requests + BeautifulSoup
import requests
from bs4 import BeautifulSoup

def fetch_from_google_scholar(scholar_id):
    url = f'https://scholar.google.com/citations?user={scholar_id}'
    # Custom scraping logic here
    pass
```

### Database Storage

Add PostgreSQL/MongoDB to persist data:

```bash
npm install pg  # or npm install mongodb
```

Update `server.js` to save publications to database instead of memory.

### Email Notifications

Setup automatic emails when citations reach milestones:

```javascript
// Add to server.js
if (newCitations > oldCitations + 10) {
    sendEmail('New citations!');
}
```

---

## Support & Resources

- **Documentation**: This file
- **Google Scholar Help**: https://support.google.com/scholar
- **Node.js Docs**: https://nodejs.org/docs/
- **Express Guide**: https://expressjs.com/
- **Python Scholarly**: https://scholarly.readthedocs.io/

---

## License

MIT License - Feel free to modify and distribute

---

## Contact & Contribution

For issues or improvements:
1. Create an issue on GitHub
2. Submit a pull request
3. Contact: syedtoukir86@gmail.com

---

## Version History

### v1.0.0 (2025)
- Initial release
- Google Scholar integration
- Publication management
- Citation analytics
- Responsive design

---

**Last Updated**: November 2025  
**Author**: Syed Toukir Ahmed Noor  
**Status**: Active & Maintained
