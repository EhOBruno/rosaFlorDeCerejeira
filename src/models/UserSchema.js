const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    processador: {
        type: String
    },
    gpu: {
        type: String
    },
    ram: {
        type: String
    },
    performanceGpu: {
        type: String
    },
    performanceCpu:{
        type: String
    }
}, {timestamps: true});

module.exports = user = mongoose.model('User', userSchema);