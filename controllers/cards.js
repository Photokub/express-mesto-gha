const Card = require("../models/cards");
const ERROR_CODE = 400;


const createCard = async (req, res) => {
  try {
    console.log(req.user._id);
    const {name, link} = req.body
    const card = await Card.create({name, link, owner: req.user._id})
    return res.status(201).send(card)
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(ERROR_CODE).send({message: err.message})
    }
    console.error(err)
    return res.status(500).send({message: "Произошла ошибка"})
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
    return res.status(200).send(cards)
  } catch (err) {
    console.error(err)
    return res.status(500).send({message: "Произошла ошибка"})
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params._id)
    if (!card) {
      res.status(404).send({message: "Карточка не обнаружена"})
    }
    return res.status(200).send(card)
  } catch (err) {
    console.error(err)
    return res.status(400).send({message: "Произошла ошибка"})
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
        res.status(404).send({message: "Карточка не обнаружена"})
      }
      res.status(200).send(card)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({message: "Произошла ошибка"})
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
        res.status(404).send({message: "Карточка не обнаружена"})
      }
      res.status(200).send(card)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({message: "Произошла ошибка"})
    })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike
}

