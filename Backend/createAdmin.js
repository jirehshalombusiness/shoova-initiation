import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

async function createAdmin() {

  await mongoose.connect(process.env.MONGO_URI);

  const password = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@shoovainitiative.org",
    password
  });

  console.log("✅ Admin created successfully");

  process.exit();
}

createAdmin();