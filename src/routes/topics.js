'use strict';

const express = require('express');
const router = express.Router();
const Topics = require('../src/topics');  // Import the Topics module

// Route to mark a topic as solved
router.post('/topics/:tid/solve', async (req, res) => {
    try {
        const tid = req.params.tid;
        await Topics.markAsSolved(tid);
        res.status(200).json({ status: 'ok', message: `Topic ${tid} marked as solved.` });
    } catch (error) {
        console.error(`Failed to mark topic ${tid} as solved: ${error}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Route to mark a topic as unsolved
router.post('/topics/:tid/unsolve', async (req, res) => {
    try {
        const tid = req.params.tid;
        await Topics.markAsUnsolved(tid);
        res.status(200).json({ status: 'ok', message: `Topic ${tid} marked as unsolved.` });
    } catch (error) {
        console.error(`Failed to mark topic ${tid} as unsolved: ${error}`);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
