const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

// Middleware to validate incoming URL
const validateUrl = (req, res, next) => {
    const url = req.query.url;

    if (!url || !/^https?:\/\/.+/.test(url)) { 
        return res.status(400).send("Invalid URL. Please provide a valid HTTP or HTTPS URL.");
    }
    next();
};

// Proxy middleware
app.use('/proxy', validateUrl, createProxyMiddleware({
    target: '',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        // Remove the /proxy part and keep the query string (the actual URL)
        const url = req.query.url;
        return url;
    },
    onProxyReq: (proxyReq, req, res) => {
        // Optionally set headers here
        proxyReq.setHeader('X-Forwarded-For', req.ip);
    },
    onError: (err, req, res) => {
        console.error(err);
        res.status(502).send("Bad Gateway");
    },
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
