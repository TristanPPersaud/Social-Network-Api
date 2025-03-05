import { Request, Response } from 'express';
import { Types } from 'mongoose';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Utility function to safely convert IDs
const toObjectId = (id: string): Types.ObjectId => new Types.ObjectId(id);

// GET all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// GET a single thought by _id
export const getThoughtById = async (req: Request, res: Response) => {
    try {
        if (!Types.ObjectId.isValid(req.params.thoughtId)) {
            return res.status(400).json({ message: 'Invalid thought ID' });
        }

        const thought = await Thought.findById(toObjectId(req.params.thoughtId));
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
    return;
};

// POST to create a new thought & associate it with a user
export const createThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username, userId } = req.body;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const thought = await Thought.create({ thoughtText, username });

        
        const user = await User.findById(toObjectId(userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Properly push thought ID into user's thoughts array
        user.thoughts.push(toObjectId(thought._id.toString()));
        await user.save();

        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
    return;
};

// PUT to update a thought by _id
export const updateThought = async (req: Request, res: Response) => {
    try {
        if (!Types.ObjectId.isValid(req.params.thoughtId)) {
            return res.status(400).json({ message: 'Invalid thought ID' });
        }

        const thought = await Thought.findByIdAndUpdate(toObjectId(req.params.thoughtId), req.body, {
            new: true,
            runValidators: true,
        });

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
    return;
};

// DELETE to remove a thought by _id
export const deleteThought = async (req: Request, res: Response) => {
    try {
        if (!Types.ObjectId.isValid(req.params.thoughtId)) {
            return res.status(400).json({ message: 'Invalid thought ID' });
        }

        const thought = await Thought.findByIdAndDelete(toObjectId(req.params.thoughtId));

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        
        await User.updateOne(
            { thoughts: toObjectId(req.params.id) },
            { $pull: { thoughts: toObjectId(req.params.id) } }
        );

        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
    return;
};