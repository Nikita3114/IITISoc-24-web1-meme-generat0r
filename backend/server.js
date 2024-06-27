// backend/server.js

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
