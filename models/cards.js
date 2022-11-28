const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const User = require('./users');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    link: {
        type: String,
        required: true,
    },
    owner: {
        User,
        type: mongoose.ObjectId,
        required: true,
    },
    likes: {
        type: mongoose.ObjectId,
        default: [],
    },
    createdAt:{
        type: { type: Date, default: Date.now },
    }
})

module.exports = mongoose.model('card', cardSchema)