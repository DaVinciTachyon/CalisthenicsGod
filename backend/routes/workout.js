const WorkoutStageOrder = require('../models/WorkoutStageOrder');

const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/stage', async (req, res) => {
    const stageOrder = await WorkoutStageOrder.findOne();
    const stages = await WorkoutStage.find();
    let orderedStages = []
    stageOrder.forEach(id => orderedStages.push(stages.find(stage => stage._id === id)));
	res.send({ stages: orderedStages });
});

router.post('/stage', async (req, res) => {
    const { error } = workoutValidation.stage(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
  
    const stageName = await WorkoutStage.findOne({
        name: req.body.name
    });
    if (stageName) return res.status(400).send({ error: 'Name already in use.' });
  
    const stage = new WorkoutStage({
        name: req.body.name,
        description: req.body.description
    });

    let stageOrder = await WorkoutStageOrder.findOne();
    if(stageOrder)
        stageOrder.order.splice(req.body.chronologicalRanking, 0, stage._id);
    else
        stageOrder = new WorkoutStageOrder({
            order: [ stage._id ]
        });

    try {
        await stage.save();
        await stageOrder.save();
        res.status(200).send(stage);
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

module.exports = router;