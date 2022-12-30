const router = require('express').Router();

const {validateUserId, validateUserInfo, validateAvatarUpdate} = require('../middlewares/validators')

const {
  getUserProfile, getUsers, getUserId, updateUserData, patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/users/me', getUserProfile);
router.get('/:_id', validateUserId, getUserId);

router.patch('/me', validateUserInfo, updateUserData);
router.patch('/me/avatar', validateAvatarUpdate, patchUserAvatar);

module.exports = router;
