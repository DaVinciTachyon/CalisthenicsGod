const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/stages', async (req, res) => {
	res.send({ stages: stages });
});

// router.post('/add', async (req, res) => {});

// router.post('/edit', async (req, res) => {});

module.exports = router;

const stages = [
    {
        _id: "1",
        name: "warm up"
    },
    {
        _id: "2",
        name: "skill"
    },
    {
        _id: "2",
        name: "strength"
    },
    {
        _id: "2",
        name: "endurance"
    },
    {
        _id: "2",
        name: "cool down"
    }
];