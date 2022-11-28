const router = require('express').Router();
const {createUser, getUser, getUserId} = require('../controllers/users');

router.post('/', createUser)
router.get('/', getUser)
router.get('/:userId', getUserId)

module.exports = router;
