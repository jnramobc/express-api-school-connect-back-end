const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const Student = require('../models/student.js');
const {Log} = require('../models/log.js')

router.use(verifyToken);

/* --------------------------- STUDENT ROUTES --------------------------- */

router.post('/', async (req, res) => { // create student
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.get('/', async (req, res) => { // index of all students
    try {
        const students = await Student.find({})
            .populate()
            .sort({ lastName: 'asc' }) // should sort alphabetically by last name
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.get('/:studentId', async (req, res) => { // student details
    try {
        const student = await Student.findById(req.params.studentId).populate("logs");
        res.status(200).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.put('/:studentId', async (req, res) => { // update student info
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.studentId,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedStudent)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.delete('/:studentId', async (req, res) => { // delete student info
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
        res.status(200).json(deletedStudent)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

/* --------------------------- LOG ROUTES --------------------------- */

router.post('/:studentId/logs', async (req, res) => { // create log
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

router.get('/:studentId/logs', async (req, res) => { // index logs
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

router.get('/:studentId/logs/:logId', async (req, res) => { // log details
    try {
        const log = await Log.findById(req.params.logId);
        res.status(200).json(log);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.put('/:studentId/logs/:logId', async (req, res) => { // update log
    try {
        const log = await Log.findById(req.params.logId);
        if (!log.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        };
        log.purpose = req.body.purpose; // need to find a way
        log.notes = req.body.notes;
        await log.save(); // save update to the log   
        
        const student = await Student.findById(req.params.studentId); // Find the student
        const studentLog = student.logs.id(req.params.logId)
        studentLog.purpose = req.body.purpose
        studentLog.notes = req.body.notes
        await student.save();
        res.status(200).json(log); // save the update to the student.logs array
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.delete('/:studentId/logs/:logId', async (req, res) => { // delete log
    try {
        const log = await Log.findById(req.params.logId);
        if (!log.userId.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        };

        const deletedLog = await Log.findByIdAndDelete(req.params.logId) // find and delete log
        const student = await Student.findById(req.params.studentId); // Find the student
        student.logs.remove({ _id: req.params.logId });
        await student.save();
        res.status(200).json({ message: 'Log deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

module.exports = router;