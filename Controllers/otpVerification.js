const twilio = require("twilio");
require("dotenv").config();

exports.sendSms = async(req,res)=>{
    try {
        const {number} = req.body;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        await client.messages
            .create({from: '+12057327644', body: 'Hi there', to: `+91${number}`})
            .then(message => console.log(message.sid));
        
        return res.json({
            status:true,
            message:"verification code sent successfully"
        })
    } 
    catch (error) {
        return res.json({
            status:false,
            message:error.message
        })
    }
}