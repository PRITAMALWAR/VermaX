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
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
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

