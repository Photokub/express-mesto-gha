const router = require('express').Router();

const { validateUserId, validateUserInfo, validateAvatarUpdate } = require('../middlewares/validators');

const {
  getUserProfile, getUsers, updateUserData, patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/users/me', validateUserId, getUserProfile);

router.patch('/me', validateUserInfo, updateUserData);
router.patch('/me/avatar', validateAvatarUpdate, patchUserAvatar);

module.exports = router;
