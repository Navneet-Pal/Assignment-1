const mongoose = require("mongoose");
require("dotenv").config()

exports.DBconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then( console.log("Database connected successfully"))
    .catch((err)=>{ 
        console.log("database connection failed")
        console.log(err);
        process.exit(1)
    })
}

