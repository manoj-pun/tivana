import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userResolvers = {
    Mutation: {
        registerUser: async (_, { input }, { res }) => {
            const { username, fullname, email, password } = input;
        
            if (!username || !fullname || !email || !password) {
                throw new Error('All fields are required');
            }
        
            try {
                // Check if user already exists
                const existingUser = await userModel.findOne({ email });
                if (existingUser) {
                    throw new Error('User already exists');
                }
        
                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
        
                // Create user
                const user = await userModel.create({
                    username,
                    fullname,
                    email,
                    password: hashedPassword,
                });
        
                // Generate JWT
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
        
                // Set cookie
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });
        
                // Return both user data and token
                return {
                    user: {
                        _id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                    },
                    token,
                };
            } catch (err) {
                throw new Error(err.message || 'Error creating user');
            }
        },        

        loginUser: async (_, { input }, { res }) => {
            const { email, password } = input;
        
            if (!email || !password) {
                throw new Error('All fields are required');
            }
        
            try {
                const user = await userModel.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }
        
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error('Invalid credentials');
                }
        
                // Generate and set cookie
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
        
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                });
        
                return {
                    user: {
                        _id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                    },
                    token,  // Return token along with user data
                };
            } catch (err) {
                throw new Error(err.message || 'Error logging in');
            }
        },

        logoutUser: async (_, __, { res }) => {
            try{
                res.clearCookie("token",{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                return {
                    message: "Logged out successfully",
                }
            }catch(err){
                throw new Error(err.message || 'Error logging out');
            }
        }
    }
}

export default userResolvers;
