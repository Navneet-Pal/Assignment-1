const User = require("../Models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Token = require("../Models/token")
require("dotenv").config();

exports.signUp = async(req,res) =>{
    try {
        const {username,email,password} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.json({
                status: false,
                message:"email already used"
            });
        }    
        let encrypyPass;
        try {
            encrypyPass = await bcrypt.hash(password,10);
        } 
        catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            })
        }

        const payload = {
            email:email,
        }
        let token = jwt.sign( payload , process.env.JWT_Secret,{expiresIn:"12h"});

        await Token.create({email,token});

        const response = await User.create({username,email,password:encrypyPass});
        response.userID = response._id;
        await response.save();
        res.status(200).json({
            status:true,
            message:"user signed up successfully",
            token:token,
            data:response
        })
    } 
    catch (error) {
        res.status(400).json({
            status:false,
            error:error.message,
        })
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const validation = await bcrypt.compare(password,user.password);
        if(!validation){
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

        const payload = {
            email:user.email,
            id:user._id
        }
        let token = jwt.sign( payload , process.env.JWT_Secret,{expiresIn:"12h"});

        await Token.create({email,token});

        res.status(200).json({
            status:true,
            token:token,
        })
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'Login Failure',
            error:error.message
        });
    }
}