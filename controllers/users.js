const User = require("../models/users");

module.exports.createUser = (req, res) => {
    const {name, about} = req.body;
    User.create({name, about})
        .then(user => res.send({data: user}))
        .catch(err => res.send(console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`)))
}



