import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const context = async ({ req }) => {
    const token = req.cookies?.token; 

    if (!token) {
        return { user: null }; 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select('-password');

        return { user }; 
    } catch (err) {
        return { user: null }; 
    }
};

export default context;
