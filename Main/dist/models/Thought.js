import { Schema, model } from 'mongoose';
import dayjs from 'dayjs';
import ReactionSchema from './Reaction.js'; // Import the Reaction subdocument
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema], // Use imported Reaction schema
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false, // Removes default _id from JSON responses
});
// Virtual for reaction count
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', ThoughtSchema);
export default Thought;
