import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res) => {
    const {username,fullname,email,password} = req.body;

    if(!username || !fullname || !email || !password){
        return res.json({success:false, message:"All the fields are required"})
    }

    try{
        const userExists = await userModel.findOne({email})

        if(userExists){
            return res.json({success:false, message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await userModel.create({
            username,
            fullname,
            email,
            password:hashedPassword
        })

        await user.save()

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            // maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({success:true});
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

