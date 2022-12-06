const Card = require("../models/cards");
const ERROR_CODE = 400;
const NOT_FOUND = 404;
const DEFAULT_ERROR = 500;


const createCard = async (req, res) => {
  try {
    console.log(req.user._id);
    const {name, link} = req.body
    const card = await Card.create({name, link, owner: req.user._id})
    return res.status(201).send(card)
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(ERROR_CODE).send({message: 'Ошибка валидации'})
    }
    console.error(err)
    return res.status(DEFAULT_ERROR).send({message: "Произошла ошибка"})
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
    return res.send(cards)
  } catch (err) {
    console.error(err)
    return res.status(DEFAULT_ERROR).send({message: "Произошла ошибка"})
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params._id)
    if (!card) {
      res.status(NOT_FOUND).send({message: "Карточка не обнаружена"})
    }
    return res.send(card)
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({message: 'Переданы некорректные данные при создании карточки'});
    } else {
      res.status(DEFAULT_ERROR).send({message: 'Произошла ошибка'});
    }
  }
}

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    {$addToSet: {likes: req.user._id}},
    {new: true},
  )
    .then(card => {
      if (!card) {
        res.status(NOT_FOUND).send({message: "Карточка не обнаружена"})
      }
      res.send(card)
    })
    .catch(err => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({message: 'Переданы некорректные данные для постановки/снятии лайка.'});
      } else {
        res.status(DEFAULT_ERROR).send({message: 'Произошла ошибка'});
      }
    })
}

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    {$pull: {likes: req.user._id}},
    {new: true},
  )
    .then(card => {
      if (!card) {
        res.status(NOT_FOUND).send({message: "Карточка не обнаружена"})
      }
      res.send(card)
    })
    .catch(err => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({message: 'Переданы некорректные данные для постановки/снятии лайка.'});
      } else {
        res.status(DEFAULT_ERROR).send({message: 'Произошла ошибка'});
      }
    })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike
}

