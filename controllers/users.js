const bcrypt = require('bcryptjs');
const User = require('../models/users');

const jwt = require('jsonwebtoken');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;

const login = (req, res) => {
  const {
    email,
    password,
  } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then(({
      matched,
      user,
    }) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const getUserProfile = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
      console.log(user);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE)
          .send({ message: 'Переданы некорректные данные пользователя' });
      } else {
        res.status(DEFAULT_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(ERROR_CODE)
          .send({ message: 'Ошибка валидации' });
      }
      console.error(err);
      return res.status(DEFAULT_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res.status(DEFAULT_ERROR)
        .send({ message: 'Произошла ошибка' });
    });
};

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
      console.log(user);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE)
          .send({ message: 'Переданы некорректные данные пользователя' });
      } else {
        res.status(DEFAULT_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserData = (req, res) => {
  const { body } = req;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: body.name,
      about: body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      const error = new Error('Пользователь по заданному id отсутствует в базе');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE)
          .send({ message: 'Передан невалидный id пользователя' });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      } else {
        res.status(DEFAULT_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE)
          .send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(DEFAULT_ERROR)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUserId,
  patchUserAvatar,
  updateUserData,
  getUserProfile,
};
