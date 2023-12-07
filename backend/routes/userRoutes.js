import express from 'express';
import {
    createUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(createUser).get(getUsers).delete(deleteUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;