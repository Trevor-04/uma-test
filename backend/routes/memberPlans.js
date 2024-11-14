const express = require('express');
const router = express.Router();
const memberPlansController = require('../functions/memberPlans');

router.get('/add', async (req, res) => {
    try {
        const planData = req.body; // Get data from request body
        const result = await memberPlansController.addPlan(planData);
        res.status(201).json({ message: 'Plan added successfully!', result });
    } catch (error) {
        console.error("Error adding plan:", error);
        res.status(500).json({ error: 'Failed to add plan.' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const donationData = req.body; // Get data from request body
        const result = await donationsController.addDonation(donationData);
        res.status(201).json({ message: 'Donation added successfully!', result });
    } catch (error) {
        console.error("Error adding donation:", error);
        res.status(500).json({ error: 'Failed to add donation.' });
    }
});

module.exports = router;