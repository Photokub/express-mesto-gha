const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    avatar: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('user', userSchema);