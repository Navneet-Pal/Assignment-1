const USERDETAILS = require('../Models/userDetails')

exports.userDetails = async(req,res)=>{
    try {
        const {firstname,lastname,dob,gender,mobileNumber,guardianNumber,houseNoAndStreet,city,state,
        pincode,referralCode,school,classs,board,subject} = req.body;

        if(!firstname || !lastname || !dob || !gender || !guardianNumber || !houseNoAndStreet || !city || !state ||
            !pincode || !school || !classs || !subject){
                return res.status(400).json({
                    status:false,
                    message:"Mandatory fields are empty"
                })
        }

        const response = await USERDETAILS.create({firstname,lastname,dob,gender,mobileNumber,guardianNumber,houseNoAndStreet,city,state,
            pincode,referralCode,school,classs,board,subject
        });

        res.status(200).json({
            status:true,
            message:" user profile succesfully created ",
            data:response,
        })      
              
    } 
    catch (error) {
        res.status(400).json({
            status:false,
            message:"problem occured while creating User's profile",
            error:error.message
        })
    }
}