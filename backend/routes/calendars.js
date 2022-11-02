const router = require('express').Router();
let Calendar = require('../models/calendar.model');


router.route('/').get((req, res) => {
    Calendar.find()
        .then(calendars => res.json(calendars))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const color = req.body.color;

    const newCalendar = new Calendar({
        name: name,
        description: description,
        color: color
    });

    newCalendar.save()
        .then(() => res.json('Calendar added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    Calendar.findById(req.params.id)
        .then(calendar => res.json(calendar))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Calendar.findByIdAndDelete(req.params.id)
        .then(() => res.json('Calendar deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const color = req.body.color;

    Calendar.findById(req.params.id)
        .then(calendar => {
            calendar.name = name;
            calendar.description = description;
            calendar.color = color;

            calendar.save()
                .then(() => res.json('Calendar ' + req.params.id + ' updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;