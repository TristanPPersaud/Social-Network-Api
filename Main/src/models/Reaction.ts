import { Schema, Types } from 'mongoose';
import dayjs from 'dayjs'; 

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false, 
  }
);

export default ReactionSchema;