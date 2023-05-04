import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
