const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/', async (req, res) => {
	res.send({ exercises: exercises });
});

router.post('/add', async (req, res) => {
  //TODO do necessary checks and use db
  req.body._id = nextId;
  nextId++;
  exercises.push(req.body);
  res.sendStatus(200);
});

//TODO router.post('/edit', async (req, res) => {});

module.exports = router;

//FIXME
let nextId = 0;
const exercises = [];