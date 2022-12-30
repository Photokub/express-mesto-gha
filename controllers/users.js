const bcrypt = require('bcrypt');
const User = require('../models/users');

const jwt = require('jsonwebtoken');

const NOT_FOUND = 404;

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

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next)
};

const getUserId = (req, res, next) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return next (new NotFoundError('Пользователь не найден'));
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

const updateUserData = (req, res, next) => {
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
      new NotFoundError('Пользователь по заданному id отсутствует в базе')
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestErr('Передан невалидный id пользователя'))
      } else if (err.statusCode === NOT_FOUND) {
        return next (new NotFoundError('Пользователь не найден'));
      } else {
        return next(new InternalServerErr('Произошла ошибка'))
      }
    });
};

const patchUserAvatar = (req, res, next) => {
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
        return next (new NotFoundError('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при обновлении аватара'))
      } else {
        return next(new InternalServerErr('Произошла ошибка'))
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
