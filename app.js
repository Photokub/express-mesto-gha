const express = require('express');

const {validateLogin} = require('./middlewares/validators')

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000, BASE_PATH } = process.env;

const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-err');

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  console.log('Подключение базы mestodb');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Ссылка на сервер ${BASE_PATH}`);
});

app.use(express.json());

app.post('/signup', validateLogin, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  return next(new NotFoundError('404 Старница не найдена'))
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка 500'
        : message
    });
});
