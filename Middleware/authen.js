const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/user")

exports.authen = async(req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }
        
        try {
            const payload = jwt.verify(token , process.env.JWT_SECRET);
            req.user = payload

        } 
        catch (error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        next();

    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }

}

exports.havePermit= async(req,res,next)=>{
    try {
         const {email} = req.body;
         const existUser = await User.findOne({email});
         if(!existUser){
            return res.json({
                success:false,
                message:"user not exist",
            })
         }
         
         if(email !== "1234@gmail.com"){
             return res.status(401).json({
                 success:false,
                 message:'This is a protected route for 1234@gmail.com only',
             });
         }
         return res.json({
            message:"you have access to this route" 
         })
         
    } 
    catch (error) {
         return res.status(500).json({
             success:false,
             message:'User id cannot be verified, please try again'
         })
    }
 }