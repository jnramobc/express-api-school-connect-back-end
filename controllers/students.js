const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const Student = require('../models/student.js');
const Log = require('../models/log.js')

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
        const student = await Student.findById(req.params.studentId).populate();
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

router.get('/:studentId/logs', async (req, res) => { // index of all student logs 
    try {
        const student = await Student.findById(req.params.studentId)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const logs = await Log.find({studentId: student})
            .populate()
            .sort({ createdAt: 'desc' }) 
        res.status(200).json(logs)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});



module.exports = router;