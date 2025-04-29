import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";

const userResolvers = {
    Mutation: {
        registerUser: async (_, { input }) => {
            const { username, fullname, email, password } = input;

            // Check if all required fields are provided
            if (!username || !fullname || !email || !password) {
                throw new Error('All fields are required');
            }

            try {
                // Check if the user already exists
                const existingUser = await userModel.findOne({ email });
                if (existingUser) {
                    throw new Error('User already exists');
                }

                // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Create and save the new user with hashed password
                const user = await userModel.create({
                    username,
                    fullname,
                    email,
                    password: hashedPassword,
                });

                return {
                    _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                };
            } catch (err) {
                throw new Error(err.message || 'Error creating user');
            }
        },

        loginUser: async(_, { input }) => {
            const { email, password } = input;

            // Check if all required fields are provided
            if (!email || !password) {
                throw new Error('All fields are required');
            }

            try {
                // Check if the user exists
                const user = await userModel.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }

                // Check if the password is correct
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error('Invalid credentials');
                }

                return {
                    _id: user._id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                };
            } catch (err) {
                throw new Error(err.message || 'Error logging in');
            }
        },

        
    }
}

export default userResolvers;
