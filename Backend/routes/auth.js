// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authorizeRoles = require('../middleware/verifyRole');

// const router = express.Router();
// const JWT_SECRET = 'pritam123'; // Replace with env variable in real apps

// // SIGNUP
// router.post('/signup', async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role: role || 'user'
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

//     const token = jwt.sign(
//       { userId: user._id, username: user.username, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: false,
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // PROTECTED ROUTES

// // User or Admin
// router.get('/user-only', authorizeRoles('user', 'admin'), (req, res) => {
//   res.status(200).json({ message: 'Hello user!', user: req.user });
// });

// // Admin only
// router.get('/admin-only', authorizeRoles('admin'), (req, res) => {
//   res.status(200).json({ message: 'Welcome Admin!', user: req.user });
// });

// module.exports = router;

















const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authorizeRoles = require('../middleware/verifyRole');

const router = express.Router();

// Use environment variable for JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// SIGNUP
router.post('/signup', async (req, res) => {
  const { username, email, password, role } = req.body;
  
  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Validate username length
  if (username.trim().length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }

  try {
    // Check if user already exists (case-insensitive email check)
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    // Handle duplicate key errors (if unique constraint fails)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// PROTECTED ROUTES

// User or Admin
router.get('/user-only', authorizeRoles('user', 'admin'), (req, res) => {
  res.status(200).json({ message: 'Hello user!', user: req.user });
});

// Admin only
router.get('/admin-only', authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!', user: req.user });
});

module.exports = router;

