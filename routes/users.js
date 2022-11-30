const router = require('express').Router();
const {createUser, getUser, getUserId} = require('../controllers/users');

router.post('/', createUser)
router.get('/', getUser)
router.get('/:_id', getUserId)

module.exports = router;
