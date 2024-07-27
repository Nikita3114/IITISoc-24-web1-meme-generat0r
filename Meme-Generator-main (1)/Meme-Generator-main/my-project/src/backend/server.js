const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs'); // Import bcryptjs instead of bcrypt
const User = require('./db/userModel');
const cors = require('cors');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const auth = require('./auth');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// register endpoint
app.post('/register', (request, response) => {
    // hash the password
    bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
            // create a new user instance and collect the data
            const user = new User({
                email: request.body.email,
                password: hashedPassword,
            });

            // save the new user
            user
                .save()
                .then((result) => {
                    response.status(201).send({
                        message: 'User Created Successfully',
                        result,
                    });
                })
                .catch((error) => {
                    response.status(500).send({
                        message: 'Error creating user',
                        error,
                    });
                });
        })
        .catch((e) => {
            response.status(500).send({
                message: 'Password was not hashed successfully',
                e,
            });
        });
});

// login endpoint
app.post('/login', (request, response) => {
    // check if email exists
    User.findOne({ email: request.body.email })
        .then((user) => {
            if (!user) {
                return response.status(404).send({
                    message: 'Email not found',
                });
            }

            // compare the password entered and the hashed password found
            bcrypt
                .compare(request.body.password, user.password)
                .then((passwordMatch) => {
                    if (!passwordMatch) {
                        return response.status(400).send({
                            message: 'Passwords do not match',
                        });
                    }

                    // create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        'RANDOM-TOKEN',
                        { expiresIn: '24h' }
                    );

                    // return success response
                    response.status(200).send({
                        message: 'Login Successful',
                        email: user.email,
                        token,
                    });
                })
                .catch((error) => {
                    response.status(400).send({
                        message: 'Passwords do not match',
                        error,
                    });
                });
        })
        .catch((e) => {
            response.status(404).send({
                message: 'Email not found',
                e,
            });
        });
});

// require database connection
const dbConnect = require('./db/dbConnect');

// execute database connection
dbConnect();

// CORS Error Handling by adding headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

// free endpoint
app.get('/free-endpoint', (request, response) => {
    response.json({ message: 'You are free to access me anytime' });
});

// authentication endpoint
app.get('/auth-endpoint', auth, (request, response) => {
    response.json({ message: 'You are authorized to access me' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
