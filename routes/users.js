const router = require('express').Router();
const {createUser, getUsers, getUserId, patchUserText, patchUserAvatar} = require('../controllers/users');

router.post('/', createUser)
router.get('/', getUsers)
router.get('/:_id', getUserId)
router.patch('/:_id', patchUserText)
router.patch('/:_id/avatar', patchUserAvatar)

module.exports = router;
