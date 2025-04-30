import userModel from "../models/userModel.js";

export const registerUser = async(req,res) => {
    const {username,fullname,email,password} = req.body;

    if(!username || !fullname || !email || !password){
        return res.status(400).send("All fields are required")
    }

    try{
        const userExists = await userModel.findOne({email})

        if(userExists){
            return res.status(400).send("User already exists")
        }

        const user = await userModel.create({
            username,
            fullname,
            email,
            password
        })

        res.status(201).json(user)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

