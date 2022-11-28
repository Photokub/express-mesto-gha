const express = require('express');
const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const {PORT = 3000} = process.env

const app = express();


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

const user = mongoose.model('user', userSchema);
module.exports = user;

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
        user,
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

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
    console.log('Подключение базы mestodb');
    app.listen(PORT, () =>
        console.log(`App listening on port ${PORT}`)
    )
});


