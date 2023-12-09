import express from 'express';
import {
    createUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(createUser).get(getUsers);
router.route('/:profileId').get(getUserProfile).put(updateUserProfile).delete(deleteUser);

export default router;