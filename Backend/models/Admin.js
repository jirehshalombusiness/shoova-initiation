import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    otp: String,
    otpExpire: Date,

    
    resetToken: String,
    resetTokenExpire: Date
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);