const router = require('express').Router();
const {createUser, getUser, getUserId, patchUserText, patchUserAvatar} = require('../controllers/users');

router.post('/', createUser)
router.get('/', getUser)
router.get('/:_id', getUserId)
router.patch('/:_id', patchUserText)
router.patch('/:_id/avatar', patchUserAvatar)

module.exports = router;
