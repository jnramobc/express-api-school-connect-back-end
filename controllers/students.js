const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const Student = require('../models/student.js');
const {Log} = require('../models/log.js')

router.use(verifyToken);

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

router.get('/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate("logs");
        res.status(200).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.put('/:studentId', async (req, res) => {
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

router.delete('/:studentId', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.studentId);
        res.status(200).json(deletedStudent)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});


module.exports = router;