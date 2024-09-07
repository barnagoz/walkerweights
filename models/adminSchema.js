import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_verified: { type: Date },
  password: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  access_list: {type: Array}
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
