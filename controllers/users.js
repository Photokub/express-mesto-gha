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

// const patchUserText = (req, res) => {
//   const {name, about} = req;

//   User.findByIdAndUpdate(
//     req.user._id,
//     {name: name, about: about},
//     {
//       new: true,
//       runValidators: true,
//       upsert: true
//     }
//   )
//
//     .then(user => {
//         if (!name && !about) {
//           return res.status(400).send({message: "Пользователь не найден"})
//         }
//         res.status(200).send(user)
//       }
//     )
//     .catch(err => {
//       console.error(err)
//       return res.status(400).send({message: "Произошла ошибка"}
//       )
//     })
// }

// const patchUserText = async (req, res) => {
//   try {
//     const {body} = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         name: body.name,
//         about: body.about
//       },
//       {
//         new: true,
//         runValidators: true,
//         upsert: true
//       }
//     )
//     if (!body.name) {
//       return res.status(400).send({message: "Поле name должно быть заполнено"})
//     } else if (!body.about) {
//       return res.status(400).send({message: "Поле about должно быть заполнено"})
//     }
//     return res.status(200).send(updatedUser)
//   } catch (err) {
//     console.error(err)
//     return res.status(400).send({message: "Произошла ошибка"})
//   }
// }

const updateUserData = (req, res) => {
  const { user: { _id} , body } = req;
  //const {body} = req.body;
  //const {name, about} = req.body;
  User.findByIdAndUpdate(_id, body, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('Пользователь по заданному id отсутствует в базе');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};


const patchUserAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {avatar: avatar},
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "Пользователь не найден"})
      }
      res.status(200).send(user)
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
  //patchUserText,
  patchUserAvatar,
  updateUserData
}



