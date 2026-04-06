// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";
// import Admin from "./models/Admin.js";

// dotenv.config();

// async function createAdmin() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
//     console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

//     if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
//       throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
//     }

//     const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
//     const rawPassword = process.env.ADMIN_PASSWORD.trim();

  
//     const existingAdmin = await Admin.findOne({ email });

//     if (existingAdmin) {
//       console.log("⚠️ Admin already exists, skipping creation");
//       process.exit();
//     }

   
//     const password = await bcrypt.hash(rawPassword, 10);

//     await Admin.create({
//       email,
//       password
//     });

//     console.log("✅ Admin created successfully");

//     process.exit();

//   } catch (error) {
//     console.error("❌ Error creating admin:", error.message);
//     process.exit(1);
//   }
// }

// createAdmin();