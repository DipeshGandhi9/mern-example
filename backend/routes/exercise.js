const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercieses => res.json(exercieses))
        .catch(error => res.status(404).json('Errors : ' + error));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    const duration = Number(req.body.duration);

    const newExercies = new Exercise({ username, description, duration, date });

    newExercies.save()
        .then(() => res.json("Exercies Added !!"))
        .catch(err => res.status(404).json("Error : " + err));

});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exerciese => res.json(exerciese))
        .catch(error => res.status(404).json('Errors : ' + error));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete (req.params.id)
        .then(() => res.json("Exercies Deleted !!"))
        .catch(error => res.status(404).json('Errors : ' + error));
});

router.route('/update/:id').post((req, res) => {

    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.date = Date.parse(req.body.date);
            exercise.duration = Number(req.body.duration);

            exercise.save()
                .then(() => res.json("Exercies Updated !!"))
                .catch(err => res.status(404).json("Error : " + err));
        })
        .catch(err => res.status(404).json("Error : " + err));

});

module.exports = router;