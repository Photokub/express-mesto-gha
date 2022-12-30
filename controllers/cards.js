const Card = require('../models/cards');

const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/bad-request-err');
const InternalServerErr = require('../errors/interval-server-err');

const createCard = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestErr('Ошибка валидации'))
    }
    console.error(err);
    return next(new InternalServerErr('Произошла ошибка'))
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    console.error(err);
    return next(new InternalServerErr('Произошла ошибка'))
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndRemove(req.params._id);
    if (!card) {
      return new NotFoundError('Карточка не обнаружена');
    }
    return res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestErr('Переданы некорректные данные при создании карточки'))
    }
    return next(new InternalServerErr('Произошла ошибка'))
  }
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return new NotFoundError('Карточка не обнаружена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr({message: 'Переданы некорректные данные для постановки/снятии лайка.'}))
      } else {
        return next(new InternalServerErr('Произошла ошибка'))
      }
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return new NotFoundError('Карточка не обнаружена');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr({message: 'Переданы некорректные данные для постановки/снятии лайка.'}))
      } else {
        return next(new InternalServerErr('Произошла ошибка'))
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
};
