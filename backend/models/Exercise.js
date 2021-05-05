const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    abbreviation: {
        type: String,
        unique: true
    },
    motionType: {
        transversePlane:{
            type: String,
            enum : ['upper','lower']
        },
        verticality:{
            type: String,
            enum : ['horizontal','vertical']
        },
        frontalPlane:{
            type: String,
            enum : ['push','pull']
        },
        kineticChain:{
            type: String,
            enum : ['closed','open']
        },
        motion:{
            type: String,
            enum : ['isometric','isotonic']
        }
    },
    potentialCategories: [{ //FIXME reference ids
        type: String
    }],
    requirements: [{ //FIXME reference ids
        type: String
    }],
    description: {
        type: String
    }
});

module.exports = mongoose.model('Exercise', exerciseSchema);