import { Schema, model, type Document } from 'mongoose';

interface IThoughts extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof User[];
}