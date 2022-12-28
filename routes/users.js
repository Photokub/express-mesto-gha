const router = require('express').Router();

const { celebrate, Joi, errors, Segments } = require('celebrate');

const {
  createUser, getUserProfile, getUsers, getUserId, updateUserData, patchUserAvatar,
} = require('../controllers/users');
const {celebrate, Joi} = require("celebrate");

//router.post('/', createUser);
//router.get('/users/me', getUserProfile);
router.get('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), getUserProfile);

router.get('/', getUsers);

//router.get('/:_id', getUserId);

router.get('/:_id', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), getUserId);

//router.patch('/me', updateUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), updateUserData);

//router.patch('/me/avatar', patchUserAvatar);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().min(2),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
}), patchUserAvatar);

module.exports = router;
