const router = require('express').Router();
const {
  createCard, getCards, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:_id', deleteCard);
router.put('/:_id/likes', putLike);
router.delete('/:_id/likes', deleteLike);

module.exports = router;
