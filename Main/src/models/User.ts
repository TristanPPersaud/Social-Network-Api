import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  friendCount: number;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


UserSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

const User = model<IUser>('User', UserSchema);

export default User;