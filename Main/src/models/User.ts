import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: typeof Thought[]
    friends: typeof User[]
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email address format',
              },
            },
        thoughts: [Thought],
        friends: [User],
        
    }
)
