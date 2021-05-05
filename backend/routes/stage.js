const WorkoutStageOrder = require('../models/WorkoutStageOrder');
const WorkoutStage = require('../models/WorkoutStage');
const workoutValidation = require('../validation/workout')
const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/', async (req, res) => {
    const stageOrder = await WorkoutStageOrder.findOne();
    let orderedStages = []
    if(stageOrder) {
        const stages = await WorkoutStage.find();
        stageOrder.order.forEach(id => orderedStages.push(stages.find(stage => stage._id.equals(id))));
    }
	res.send({ stages: orderedStages });
});

router.post('/', async (req, res) => {
    const { error } = workoutValidation.stage(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message, notme:"hi" });
  
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