const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/stage', async (req, res) => {
    const stages = await WorkoutStage.find();

	res.send({ stages: stages });
});

router.post('/stage', async (req, res) => { //FIXME ensure requirements and potentialCategories are valid ids
    const { error } = workoutValidation.stage(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
  
    const stageName = await WorkoutStage.findOne({
        name: req.body.name
    });
    if (stageName) return res.status(400).send({ error: 'Name already in use.' });
  
    const stage = new WorkoutStage({
        name: req.body.name,
        chronologicalRanking: req.body.chronologicalRanking, //FIXME add in and push all the others back
        description: req.body.description
    });

    try {
        await stage.save();
        res.status(200).send(stage);
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

module.exports = router;