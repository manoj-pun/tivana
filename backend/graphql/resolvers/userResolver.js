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

                return user;
            } catch (err) {
                throw new Error(err.message || 'Error creating user');
            }
        }
    }
}

export default userResolvers;
