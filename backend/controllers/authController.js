import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegisterInput } from "../utils/authValidate.js";
import { validateLoginInput } from "../utils/authValidate.js";

export const registerUser = async (req, res) => {
  const { username, fullname, email, password } = req.body;

  const validationError = validateRegisterInput({ username, fullname, email, password });
  if (validationError) {
    return res.json({ success: false, message: validationError });
  }

  try {
    const usernameExist = await userModel.findOne({ username });

    const userExists = await userModel.findOne({ email });

    if (usernameExist) {
      return res.json({ success: false, message: "Username is already used." });
    }

    if (userExists) {
      return res.json({ success: false, message: "Email already signed up." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      fullname,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id,username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      // maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const validationError = validateLoginInput({ email, password });
  if (validationError) {
    return res.json({ success: false, message: validationError });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User don't exists." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      // maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      // maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//check if the user is authenticated
export const isAuthenticated = async(req,res) => {
  try {
      return res.json({success:true})
  } catch (error) {
      res.json({success:false,message:error.message})
  }
}
