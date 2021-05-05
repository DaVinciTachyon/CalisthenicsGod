const router = require('express').Router();

router.use((req, res, next) => {
	next();
});

router.get('/', async (req, res) => {
	res.send({ exercises: exercises });
});

// router.post('/add', async (req, res) => {});

// router.post('/edit', async (req, res) => {});

module.exports = router;

const exercises = [
    {
      _id: "1",
      name: "planche",
      abbreviation: "pl",
      motionType: {
        transversePlane: "upper",
        kineticChain: "closed",
        verticality: "horizontal",
        frontalPlane: "push",
        motion: "isometric"
      },
      potentialCategories: [
        "skill"
      ],
      requirements: [],
      description: ""
    },
    {
      _id: "2",
      name: "pull up",
      abbreviation: "",
      motionType: {
        transversePlane: "upper",
        verticality: "vertical",
        frontalPlane: "pull",
        kineticChain: "closed",
        motion: "isotonic"
      },
      potentialCategories: [
        "strength"
      ],
      requirements: [],
      description: ""
    },
    {
      _id: "3",
      name: "front lever",
      abbreviation: "fl",
      motionType: {
        transversePlane: "upper",
        verticality: "horizontal",
        frontalPlane: "pull",
        kineticChain: "closed",
        motion: "isometric"
      },
      potentialCategories: [
        "skill"
      ],
      requirements: [],
      description: ""
    },
    {
      _id: "3",
      name: "handstand push up",
      abbreviation: "hspu",
      motionType: {
        transversePlane: "upper",
        verticality: "horizontal",
        frontalPlane: "push",
        kineticChain: "closed",
        motion: "isotonic"
      },
      potentialCategories: [
        "strength"
      ],
      requirements: [],
      description: ""
    },
    {
      _id: "4",
      name: "squat",
      abbreviation: "",
      motionType: {
        transversePlane: "lower",
        verticality: "vertical",
        frontalPlane: "push",
        kineticChain: "closed",
        motion: "isotonic"
      },
      potentialCategories: [
        "strength"
      ],
      requirements: [],
      description: ""
    },
];