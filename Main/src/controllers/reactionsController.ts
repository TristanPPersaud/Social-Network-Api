import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import mongoose from 'mongoose';

// POST to create a reaction stored in a single thought's reactions array field
export const createReaction = async (req: Request, res: Response) => {
  try {
    const { reactionBody, username } = req.body;
    const { thoughtId } = req.params;

    // Validate reaction body and username
    if (!reactionBody || !username) {
      return res.status(400).json({ message: 'Reaction body and username are required' });
    }

    // Create a new reaction object
    const reaction = {
      reactionBody,
      username,
      createdAt: new Date(),
    };

    // Add reaction to the thought's reactions array
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction } },
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }

  return;
};

export const deleteReaction = async (req: Request, res: Response) => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      // Remove reaction from the thought's reactions array by reactionId
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: new mongoose.Types.ObjectId(reactionId) } } },
        { new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json({ message: 'Reaction deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }

    return;
  };