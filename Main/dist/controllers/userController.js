import User from '../models/User.js';
import mongoose from 'mongoose';
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().populate('thoughts friends');
        return res.json(users);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'User deleted' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// POST: Add a friend
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid userId or friendId' });
        }
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
        }
        if (!user.friends.some((id) => id.toString() === friendId)) {
            user.friends.push(new mongoose.Types.ObjectId(friendId.toString()));
            ; // <-- Fix applied
            await user.save();
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// DELETE: Remove a friend
export const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Filter out the friend by comparing ObjectId as a string
        user.friends = user.friends.filter((id) => id.toString() !== friendId);
        await user.save();
        return res.json({ message: 'Friend removed', user });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
