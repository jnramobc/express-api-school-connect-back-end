// controllers/logs.js

const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Log = require('../models/log.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

router.post('/', async (req, res) => {
    try {
      req.body.userId = req.user._id;  // Ensure the logged-in user is marked as the author
      const log = await Log.create(req.body);
      log._doc.userId = req.user;  // Attach the full user object for the client
      res.status(201).json(log);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });



router.get('/', async (req, res) => {
    try {
      const logs = await Log.find({})
        .populate('userId', 'username') // Populate user details
        .populate('studentId', 'firstName lastName') // Populate student details
        .sort({ createdAt: 'desc' }); // Sort by most recent logs
  
      res.status(200).json(logs); // Send logs as JSON
    } catch (error) {
      res.status(500).json({ error: error.message }); // Send error if any
    }
});
  


module.exports = router;
