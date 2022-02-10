import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    hashedName: { type: String, required: true, trim: true },
    hashedEmail: { type: String, required: true, trim: true },
    posts: [Schema.Types.ObjectId],
    nickName: String,
    auth: String,
    admin: { type: String, enum: ['yes', 'no'] },
  },
  { timestamps: true },
);

export default model('User', UserSchema);
