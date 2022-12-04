const User = require("../models/users");

const createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(400).send({message: err.message})
      }
      console.error(err)
      return res.status(500).send({message: "Произошла ошибка"}
      )
    })
}

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch((err) => {
      console.error(err)
      return res.status(500).send({message: "Произошла ошибка"})
    })
}

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "Пользователь не найден"})
      }
      console.log(user);
      return res.status(200).send(user);
    })
    .then(user => res.send(user))
    .catch(err => {
      console.error(err)
      return res.status(400).send({message: "Произошла ошибка"}
      )
    })
}

const patchUserText = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    {name: name, about: about},
    {new: true}
  )
    .then(user => {
        if (!user) {
          return res.status(404).send({message: "Пользователь не найден"})
        }
      if(res === req){
        res.status(200).send(user)
      }
      }
    )
    .catch(err => {
      console.error(err)
      return res.status(400).send({message: "Произошла ошибка"}
      )
    })
}

const patchUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    {avatar: avatar},
    {new: true}
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "Пользователь не найден"})
      }
      if(res === req){
        res.status(200).send(user)
      }
    })
    .catch(err => {
      console.error(err)
      return res.status(400).send({message: "Произошла ошибка"}
      )
    })
}


module.exports = {
  createUser,
  getUsers,
  getUserId,
  patchUserText,
  patchUserAvatar
}



