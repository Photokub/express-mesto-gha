const router = require('express').Router();
const {
  createUser, getUserProfile, getUsers, getUserId, updateUserData, patchUserAvatar,
} = require('../controllers/users');

//router.post('/', createUser);
router.get('/users/me', getUserProfile);
router.get('/', getUsers);
router.get('/:_id', getUserId);
router.patch('/me', updateUserData);
router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
