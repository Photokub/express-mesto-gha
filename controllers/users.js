const User = require("../models/users");

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then(user => res.send(user))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}

const getUser = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}

const getUserId = (req, res) => {
  const {name, about} = req.body;
  User.findById(req.params._id)
    .then(user => {
      user.name = name;
      user.about = about;
      console.log(user);
      return user;
    })
    .then(user => res.send(user))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}

const patchUserText = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.params._id, { name: name,  about: about })
    .then(user => res.send(user))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}

const patchUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.params._id, {avatar: avatar})
    .then(user => res.send(user))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}


module.exports = {
  createUser,
  getUser,
  getUserId,
  patchUserText,
  patchUserAvatar
}



