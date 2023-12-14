import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_verified: { type: Date },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
