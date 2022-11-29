const Card = require("../models/cards");

const createCard = (req, res) => {
  console.log(req.user._id);
  const {name, link} = req.body
  const _id = req.user._id
  Card.create({name, link, _id})
    .then(cards => res.send(cards))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
};

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then(cards => res.send({data: cards}))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}

module.exports = {
  createCard,
  getCards,
  deleteCard
}

