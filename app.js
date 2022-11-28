const express = require('express');
const app = express();
const mongoose = require('mongoose');

//const {PORT = 3000} = process.env
const { PORT = 3000, BASE_PATH } = process.env;
const {Schema} = require("mongoose");
const User = require("./models/users");
const Card = require("./models/cards")
const users = require('./routes/users')



app.use('/users', require('./routes/users'));



mongoose.connect('mongodb://localhost:27017/mestodb', () => {
    console.log('Подключение базы mestodb');
    app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`),
            console.log(`Ссылка на сервер ${BASE_PATH}`);
        }
    )
});


