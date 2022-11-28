const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();
const User = require("../models/users");

router.post('/users', (req, res) => {
    const {name, about} = req.body;
    User.create({name, about})
        .then(user => res.send({data: user}))
        .catch(err => res.send(console.log(`Произошла ошибка: ${err}. Текст ошибки: ${err.message}`)))
})

module.exports = router;
