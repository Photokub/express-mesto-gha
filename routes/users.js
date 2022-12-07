const router = require('express').Router();
const {
  createUser, getUsers, getUserId, updateUserData, patchUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:_id', getUserId);
router.patch('/me', updateUserData);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
