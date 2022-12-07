const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Подключение базы mestodb');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер ${BASE_PATH}`);
});

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6386592bf89b2ed25204e3bd',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: '404 Старница не найдена' });
});
