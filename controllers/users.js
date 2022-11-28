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
  User.findById(req.params._id)
    .then(user => res.send(user))
    .catch(err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`))
}

// const createUser = async (req, res) => {
//   const {name, about, avatar} = req.body;
//   try {
//     const user = await User.create({name, about, avatar})
//     return res.json(user)
//   } catch {err => console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`)}
// }
//
module.exports = {
  createUser,
  getUser,
  getUserId
}



