const express = require('express');
const cors = require('cors');
const productsRouter = require('./api/products.cjs');
const authRouter = require('./api/auth.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);

// Error handling for port in use
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
        server.listen(PORT + 1);
    } else {
        console.error('Server error:', err);
    }
});