const bcrypt = require('bcrypt');
const User = require('../models/users');

const jwt = require('jsonwebtoken');

const ERROR_CODE = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;

const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const InternalServerErr = require('../errors/interval-server-err');
const ConflictErr = require('../errors/conflict-err')

const login = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({email}).select('+password')
    const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
    if (!user) {
      return next (new NotFoundError('Неправильные почта или пароль 404'));
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return next (new NotFoundError('Неправильные почта или пароль 404'));
    }
    res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true }).send({_id: user._id, user: user.email, message: 'Токен jwt передан в cookie'});
  } catch (err) {
    next(err)
  }
}

const getUserProfile = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      console.log(user);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Переданы некорректные данные пользователя'))
      } else {
        return next(new InternalServerErr('Произошла ошибка'))
      }
    });
};

const createUser = (req, res, next) => {
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
        return next(new BadRequestErr('Переданы некорректные данные пользователя'))
      }
      if (err.code === 11000) {
        return next(new ConflictErr(`Пользователь с ${email} уже существует`));
      } else {
        return next(new InternalServerErr('Произошла ошибка'))
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res.status(DEFAULT_ERROR)
        .send({message: 'Произошла ошибка'});
    });
};

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({message: 'Пользователь не найден'});
      }
      console.log(user);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE)
          .send({message: 'Переданы некорректные данные пользователя'});
      } else {
        res.status(DEFAULT_ERROR)
          .send({message: 'Произошла ошибка'});
      }
    });
};

const updateUserData = (req, res) => {
  const {body} = req;
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
          .send({message: 'Передан невалидный id пользователя'});
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND)
          .send({message: 'Пользователь не найден'});
      } else {
        res.status(DEFAULT_ERROR)
          .send({message: 'Произошла ошибка'});
      }
    });
};

const patchUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND)
          .send({message: 'Пользователь не найден'});
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE)
          .send({message: 'Переданы некорректные данные при обновлении аватара.'});
      } else {
        res.status(DEFAULT_ERROR)
          .send({message: 'Произошла ошибка'});
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
