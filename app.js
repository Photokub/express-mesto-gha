const express = require('express');
const app = express();
const mongoose = require('mongoose');

//const {PORT = 3000} = process.env
const {PORT = 3000, BASE_PATH} = process.env;
const {Schema} = require("mongoose");
const User = require("./models/users");
const Card = require("./models/cards")
const users = require('./routes/users')

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Подключение базы mestodb');
  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`),
        console.log(`Ссылка на сервер ${BASE_PATH}`);
    }
  )
});

app.use(express.json());
app.use('/users', require('./routes/users'));
//app.use('/users/:userId', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {
    _id: '6386592bf89b2ed25204e3bd'
  };
  next();
});

app.use('/cards', require('./routes/cards'));
//app.use('/cards/:cardId', require('./routes/cards'));


