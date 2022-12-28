const router = require('express').Router();

const { celebrate, Joi, errors, Segments } = require('celebrate');

const {
  createCard, getCards, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

//router.delete('/:_id', deleteCard);
router.delete('/:_id', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.object().required(),
    owner: Joi.string().min(2),
    likes: Joi.array().default([]),
    createdAt: Joi.date().default(Date.now),
  }).unknown(true),
}), deleteCard);

//router.put('/:_id/likes', putLike);
router.put('/:_id/likes', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.object().required(),
    owner: Joi.string().min(2),
    likes: Joi.array().default([]),
    createdAt: Joi.date().default(Date.now),
  }).unknown(true),
}), putLike);

//router.delete('/:_id/likes', deleteLike);
router.delete('/:_id/likes', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.object().required(),
    owner: Joi.string().min(2),
    likes: Joi.array().default([]),
    createdAt: Joi.date().default(Date.now),
  }).unknown(true),
}), deleteLike);

module.exports = router;
