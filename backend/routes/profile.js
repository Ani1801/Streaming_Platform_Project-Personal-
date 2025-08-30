const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User model is in ../models/User
const Profile = require('../models/Profile'); // Create a new Profile model
const jwt = require('jsonwebtoken');

// Middleware to protect routes and get user ID from token
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded.id; // Get the user ID from the token payload
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// GET user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST or PUT user profile
router.post('/', authMiddleware, async (req, res) => {
  const { fullName, phoneNumber, genrePreferences } = req.body;
  
  try {
    let profile = await Profile.findOne({ user: req.user });

    if (profile) {
      // Update existing profile
      profile.fullName = fullName;
      profile.phoneNumber = phoneNumber;
      profile.genrePreferences = genrePreferences;
      await profile.save();
      res.json({ message: 'Profile updated successfully', profile });
    } else {
      // Create new profile
      profile = new Profile({
        user: req.user,
        fullName,
        phoneNumber,
        genrePreferences,
      });
      await profile.save();
      res.status(201).json({ message: 'Profile created successfully', profile });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
