const express = require('express');
const mongoose = require('mongoose');

const { validateLogin } = require('./middlewares/validators');

const app = express();

const { PORT = 3000, BASE_PATH } = process.env;

const { login, createUser } = require('./controllers/users');
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

app.use('*', (req, res, next) => next(new NotFoundError('404 Старница не найдена')));

app.use(require('./middlewares/errors'))
