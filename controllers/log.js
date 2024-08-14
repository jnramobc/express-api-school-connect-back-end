const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const Student = require('../models/student.js');
const {Log} = require('../models/log.js')

router.use(verifyToken);

/* --------------------------- LOG ROUTES --------------------------- */


// move this to a different .js
// we need move the params from front-end before submitting the form
// so that the back-end has it
router.post('/', async (req, res) => { // create log
    try {
        req.body.userId = req.user._id;  // Ensure the logged-in user is marked as the author
        req.body.studentId = req.params.studentId; // Ensure the studentId is a part of the log
        const log = await Log.create(req.body); // Create the log object
        const student = await Student.findById(req.params.studentId); // Find the student to push the log into the student.logs array
        student.logs.push(log); // push the log into the array
        await student.save(); // save the update
        res.status(201).json(log);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.get('/', async (req, res) => { // index logs
    try {
        const student = await Student.findById(req.params.studentId);
        const studentLogs = student.logs;
        console.log(student)
        console.log(studentLogs)
        res.status(200).json(studentLogs); // Send logs as JSON
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message }); // Send error if any
    }
});

router.get('/:logId', async (req, res) => { // log details
    try {
        const log = await Log.findById(req.params.logId);
        res.status(200).json(log);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.put('/:logId', async (req, res) => { // update log
    try {
        const log = await Log.findById(req.params.logId);
        if (!log.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        };
        log.purpose = req.body.purpose; // need to find a way
        log.notes = req.body.notes;
        await log.save(); // save update to the log   
        res.status(200).json(log); // save the update to the student.logs array
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.delete('/:logId', async (req, res) => { // delete log
    try {
        const log = await Log.findById(req.params.logId);
        if (!log.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        };
        const deletedLog = await Log.findByIdAndDelete(req.params.logId)
        res.status(200).json({ message: 'Log deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

module.exports = router;