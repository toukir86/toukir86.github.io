/**
 * Backend API for Academic Portfolio
 * Node.js Express server
 * 
 * Requirements:
 * - express
 * - cors
 * - body-parser
 * 
 * Install: npm install express cors body-parser
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// ============================================
// API ENDPOINTS
// ============================================

/**
 * GET / - Serve main HTML
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/**
 * POST /api/contact - Handle contact form
 */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // In production, send email using nodemailer or similar
        console.log('Contact form submission:', {
            name,
            email,
            subject,
            message,
            timestamp: new Date()
        });

        res.json({
            success: true,
            message: 'Message received. We will get back to you soon!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing contact form'
        });
    }
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error'
    });
});

// ============================================
// SERVER STARTUP
// ============================================

app.listen(PORT, () => {
    console.log(`\n╔═══════════════════════════════════════════╗`);
    console.log(`║  Academic Portfolio Server                ║`);
    console.log(`║  Listening on http://localhost:${PORT}      ║`);
    console.log(`╚═══════════════════════════════════════════╝\n`);
});

module.exports = app;
