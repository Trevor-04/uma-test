const express = require('express');
const eventsController = require('../functions/events');

const router = express.Router();

// Get upcoming events
router.get('/upcoming', async (req, res) => {
    try {
        const eventsList = await eventsController.getUpcomingEvents();
        return res.json(eventsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming events' });
    }
});

//List all Events
router.get('/', async (req, res) => {
    try {
        const eventsList = await eventsController.listAllEvents();
        return res.status(201).json(eventsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming events' });
    }
});

// Add a new event
router.post('/add', async (req, res) => {
    try {
        const { eventID, eventName, eventTime, members_only, exhibitID, sponsorID } = req.body;

        const eventData = {eventID, eventName, eventTime, members_only, exhibitID, sponsorID}
        const result = await eventsController.addEvent(eventData);
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to add event' });
    }
});

// delete an event (by eventID)
router.post('/delete', async (req, res) => {
    try {
        const { eventID } = req.body;
        const result = await eventsController.deleteEvent({ eventID });
        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;