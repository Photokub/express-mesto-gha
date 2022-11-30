const router = require('express').Router();
const {createCard, getCards, deleteCard} = require('../controllers/cards');

router.get('/', getCards)
router.post('/', createCard)
router.delete('/:_id', deleteCard)

module.exports = router;