const mongoose = require('mongoose');

module.exports = mongoose.model('Measurements', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weight: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    height: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    waist: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    hips: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    rightBicep: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    leftBicep: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    rightForearm: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    leftForearm: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    shoulders: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    chest: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    neck: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]
}));
