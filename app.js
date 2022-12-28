const express = require('express');

const { celebrate, Joi, errors, Segments } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;

const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Подключение базы mestodb');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер ${BASE_PATH}`);
});

app.use(express.json());
app.use(bodyParser.json());

// app.post('/signin', login);
// app.post('/signup', createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    //name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    //about: Joi.string().min(2).default('Исследователь'),
    //avatar: Joi.string().min(2).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}),login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).default('Исследователь'),
    avatar: Joi.string().min(2).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}),createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: '404 Старница не найдена' });
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});
