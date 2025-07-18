import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export async function CreateUser(req, res) {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }


    const hashedPassword = bcrypt.hashSync(password, 10);
    
    console.log(hashedPassword);

    const user = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "User signup successful",
      token,
      User: {
        id: user._id,
        name: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
}

export async function UserLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Password not stored in DB" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(201).json({
      message: "User signup successful",
      token,
      User: {
        id: user._id,
        name: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
