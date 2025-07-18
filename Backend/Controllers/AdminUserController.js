import Admin from "../Models/AdminUserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export async function CreateAdminUser(req, res) {
  try {
    const { firstname, lastname, username, email, password } = req.body;


    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    console.log(hashedPassword);

    const admin = new Admin({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "Admin signup successful",
      token,
      admin: {
        id: admin._id,
        name: admin.firstname,
        lastname: admin.lastname,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
}

export async function AdminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.password) {
      return res.status(500).json({ message: "Password not stored in DB" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.firstname,
        lastname: admin.lastname,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
