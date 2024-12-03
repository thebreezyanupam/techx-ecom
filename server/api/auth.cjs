const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.js');

const JWT_SECRET = 'your-secret-key';

// Test route to verify the router is working
router.get('/test', (req, res) => {
    res.json({ message: 'Auth router is working' });
});

// Register endpoint
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit', req.body); // Debug log
    
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ 
                message: 'Please provide all required fields' 
            });
        }

        // Check if user exists
        const userCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1', 
            [email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ 
                message: 'User already exists' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        const token = jwt.sign(
            { id: result.rows[0].id }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({
            user: {
                id: result.rows[0].id,
                name: result.rows[0].name,
                email: result.rows[0].email
            },
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error during registration' 
        });
    }
});

module.exports = router; 