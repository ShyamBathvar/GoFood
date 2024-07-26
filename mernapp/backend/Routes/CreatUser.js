const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtSecret = "mynameissdkskdasdkf";

router.post(
  '/createuser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log("Creating user with data:", req.body);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        location: req.body.location,
      });

      console.log("User created successfully");
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.json({ success: false });
    }
  }
);

router.post('/loginuser', [body('email').isEmail(), body('password', 'Incorrect Password').isLength({ min: 5 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let email = req.body.email;
  try {
    console.log("Attempting login with data:", req.body);
    let userData = await User.findOne({ email });
    if (!userData) {
      console.log("User not found");
      return res.status(400).json({ errors: 'Try logging with correct credentials' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(400).json({ errors: 'Try logging with correct credentials' });
    }

    console.log("User authenticated successfully");
    const data = {
      user: {
        id: userData.id
      }
    }

    const authToken = jwt.sign(data, jwtSecret);
    console.log("Token generated:", authToken);
    return res.json({ success: true, authToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.json({ success: false });
  }
});

module.exports = router;
