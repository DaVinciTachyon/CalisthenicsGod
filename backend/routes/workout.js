const router = require('express').Router();
const stageRoute = require('./stage');
const verify = require('./tokenVerification');

router.use(verify, (req, res, next) => {
  next();
});
router.use('/stage', stageRoute);

router.get('/', (req, res) => {
  //TODO only look for workouts with user id
  res.send({ workouts: workouts });
});

module.exports = router;

const workouts = [
  //FIXME
  {
    date: '01.01.2021',
    stages: [
      {
        _id: 'stageId',
        name: 'stageName',
        exercises: [
          {
            _id: 'exerciseId',
            name: 'pull up',
            type: {
              _id: 'motionId',
              name: 'eccentric',
            },
            sets: [
              {
                repetitions: 10,
                time: 10,
              },
              {
                repetitions: 8,
                time: 10,
              },
            ],
            rest: {
              interset: 180,
              intraset: 180,
            },
          },
        ],
      },
    ],
  },
];
