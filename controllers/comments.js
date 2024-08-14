const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const { Log } = require('../models/log.js');

router.use(verifyToken);

/* --------------------------- LOG ROUTES --------------------------- */

router.post('/:logId/comments', async (req, res) => {
    try {
        req.body.userId = req.user._id;  // Attach the logged-in user as the author
        const log = await Log.findById(req.params.logId);
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }
        log.comments.push(req.body);
        await log.save();

        const newComment = log.comments[log.comments.length - 1];
        res.status(201).json(newComment); // Return the newly created comment
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:logId/comments/:commentId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }
        const comment = log.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (!comment.userId.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized to update this comment" });
        }

        comment.text = req.body.text;
        await log.save();
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:logId/comments/:commentId', async (req, res) => {
    try {
        const log = await Log.findById(req.params.logId);
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }

        const comment = log.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (!comment.userId.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized to delete this comment" });
        }

        
        await comment.deleteOne();

        await log.save(); // Save the log after the comment is removed

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;