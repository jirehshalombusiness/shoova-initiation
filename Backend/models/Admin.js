import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
  type: String,
  unique: true,
  required: true
},
  password: String
});

export default mongoose.model("Admin", adminSchema);