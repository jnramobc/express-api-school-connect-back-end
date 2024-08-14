const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token.js');
const {Log} = require('../models/log.js')

router.use(verifyToken);

/* --------------------------- LOG ROUTES --------------------------- */


// move this to a different .js
// we need move the params from front-end before submitting the form
// so that the back-end has it
router.post('/', async (req, res) => { // create log
    try {
        req.body.userId = req.user._id;  // Ensure the logged-in user is marked as the author
        const log = await Log.create(req.body); // Create the log object
        res.status(201).json(log);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.get('/', async (req, res) => { // index logs
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message }); // Send error if any
    }
});

router.get('/:logId', async (req, res) => { // 
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.put('/:logId', async (req, res) => { // update log
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
});

router.delete('/:logId', async (req, res) => { // delete log
    try {
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    };
})

module.exports = router;