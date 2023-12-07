import asyncHandler from "express-async-handler";

// @desc    Create user
// route    POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Create User' });
});

// @desc    Get users
// route    GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get users list' });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Public
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get user profile' });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Public
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update user profile' });
});

// @desc    Delete user
// route    DELETE /api/users
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Delete user' });
});

export { 
    createUser,
    getUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
};