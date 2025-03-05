import { Router } from 'express';
import { getAllThoughts, deleteThought, updateThought, getThoughtById, createThought } from '../../controllers/thoughtsController.js';
import { createReaction, deleteReaction } from '../../controllers/reactionsController.js';
const router = Router();
// Get all thoughts & create a thought
router.route('/')
    .get(getAllThoughts)
    .post(createThought);
// Get, update, or delete a thought by ID
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
// Add a reaction to a thought
router.route('/:thoughtId/reactions')
    .post(createReaction);
// Remove a reaction by reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
export default router;
