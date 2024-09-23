const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Configure the proxy middleware
app.use('/proxy', createProxyMiddleware({
    target: '', // Leave blank for now, we will dynamically set this
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // Add necessary headers or modifications here if needed
    },
    onProxyRes: (proxyRes, req, res) => {
        // You can manipulate the response here if necessary
    },
}));

// Serve static files from the public directory (where your HTML file will be placed)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
