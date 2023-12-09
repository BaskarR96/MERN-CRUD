import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Create user
// route    POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User is already exist.')
    }
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
    })
    if (user) {
        res.status(201).json({
            message: 'User created successfully.',
            data: {
                _id: user?._id,
                name: `${user?.first_name} ${user?.last_name}`.trim(),
                email: user?.email
            }
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Get users
// route    GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const usersList = await User.find({}, {
        _id: 1,
        first_name: 1,
        last_name: 1,
        email: 1,
    });
    if (Array.isArray(usersList) && usersList.length > 0) {
        res.status(200).json({
            message: '',
            data: usersList
        });
    } else {
        res.status(204);
        throw new Error('No records.')
    }
});

// @desc    Get user profile
// route    GET /api/users/:profileId
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
    const profileId = req.params.profileId;
    const userDetails = await User.findOne({ _id: profileId });
    if (userDetails) {
        res.status(200).json({
            message: '',
            data: {
                first_name: userDetails?.first_name,
                last_name: userDetails?.last_name,
                email: userDetails?.email,
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// route    PUT /api/users/:profileId
// @access  Public
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.profileId);
    if (user) {
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.password = user.password;
        const updatedUser = await user.save();
        res.status(200).json({
            message: 'User updated successfully.',
            data: {
                _id: updatedUser._id,
                first_name: updatedUser?.first_name,
                last_name: updatedUser?.last_name,
                email: updatedUser?.email,
            }
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// route    DELETE /api/users/:profileId
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    const userDeleted = await User.deleteOne({ _id: req.params.profileId });
    if (userDeleted?.deletedCount) {
        res.status(200).json({
            message: 'User deleted successfully.'
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    createUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
};