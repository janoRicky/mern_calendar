const router = require('express').Router();
let Event = require('../models/event.model');


router.route('/').get((req, 
    res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const date_start = Date.parse(req.body.date_start) || '';
    const date_end = Date.parse(req.body.date_end) || '';

    const newEvent = new Event({
        name: name,
        description: description,
        date_start: date_start,
        date_end: date_end
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const date_start = Date.parse(req.body.date_start) || '';
    const date_end = Date.parse(req.body.date_end) || '';

    Event.findById(req.params.id)
        .then(event => {
            event.name = name;
            event.description = description;
            event.date_start = date_start;
            event.date_end = date_end;

            event.save()
                .then(() => res.json('Event ' + req.params.id + ' updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;