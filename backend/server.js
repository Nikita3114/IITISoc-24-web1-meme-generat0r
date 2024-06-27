// backend/server.js
/*
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const LogInCollection = require('./mongo');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
const staticPath = path.join(__dirname, '../frontend/build');
app.use(express.static(staticPath));

// API routes
app.post('/api/signup', async (req, res) => {
    const { name, password } = req.body;

    try {
        const userExists = await LogInCollection.findOne({ name });

        if (userExists) {
            return res.status(400).send("User already exists");
        }

        const newUser = new LogInCollection({ name, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await LogInCollection.findOne({ name });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ username: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

// Catch-all handler to serve the React app for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors'); // if needed for cross-origin requests
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS if needed

// Replace 'your_jwt_secret_here' with a secure random string in production
const jwtSecret = 'your_jwt_secret_here';

// Example in-memory user storage (replace with database logic in production)
const users = [];

// Routes
app.post('/api/signup', async (req, res) => {
    const { name, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { name, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully' });
});

app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;

    // Find user
    const user = users.find(user => user.name === name);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Protected route example (requires JWT)
app.get('/api/profile', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}!` });
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
