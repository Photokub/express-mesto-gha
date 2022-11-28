const express = require('express');
const app = express();
const mongoose = require('mongoose');

const {PORT = 3000} = process.env
const {Schema} = require("mongoose");
const User = require("./models/users");
const Card = require("./models/cards")
const router = require('./routers/users')



app.use('/', router);



mongoose.connect('mongodb://localhost:27017/mestodb', () => {
    console.log('Подключение базы mestodb');
    app.listen(PORT, () =>
        console.log(`App listening on port ${PORT}`)
    )
});


