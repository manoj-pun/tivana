import userModel from "../models/userModel.js";

export const getUserData = async(req,res) => {
    try {
        const userId = req.user?.id;

        const user = await userModel.findById(userId);
        // console.log(user)

        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        res.json({
            success:true,
            userData:{
                username:user.username,
                fullname:user.fullname,
            }
        });

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}