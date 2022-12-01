const router = require('express').Router();
const {createCard, getCards, deleteCard, putLike} = require('../controllers/cards');

router.get('/', getCards)
router.post('/', createCard)
router.delete('/:_id', deleteCard)
router.put('/_:id/likes', putLike)

module.exports = router;