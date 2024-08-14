const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const { Log } = require('../models/log.js');

router.use(verifyToken);

/* --------------------------- LOG ROUTES --------------------------- */

// Create a new log
router.post('/', async (req, res) => {
    try {
        req.body.userId = req.user._id;  // Attach logged-in user as author
        const log = await Log.create(req.body); // Create the log entry
        res.status(201).json(log); // Return the newly created log
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get all logs
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find({ userId: req.user._id }) // Fetch logs for the logged-in user
            .populate('userId')
            .populate('studentId')
            .sort({ createdAt: 'desc' }); // Sort by the most recent logs
        res.status(200).json(logs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get a specific log by ID
router.get('/:logId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId)
            .populate('userId')
            .populate('studentId');
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }
        res.status(200).json(log);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Update a specific log by ID
router.put('/:logId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }

        if (!log.userId.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized to update this log" });
        }

        const updatedLog = await Log.findByIdAndUpdate(req.params.logId, req.body, { new: true });
        res.status(200).json(updatedLog);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


// Delete a specific log by ID
router.delete('/:logId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }

        if (!log.userId.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized to delete this log" });
        }

        await log.deleteOne();
        res.status(200).json({ message: "Log deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;