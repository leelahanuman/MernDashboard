const mongoose=require("mongoose");
const connect=async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DB CONNECTED SUCCESFULLY");
    }
    catch(error){
        console.log("Connection,error");
    }
};

module.exports=connect;