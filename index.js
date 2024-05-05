const express=require('express')
require('dotenv').config();
const cors=require('cors')
const app=express();

const connection=require("./dbConnection");
connection();

app.use(express.json());
app.use(cors());
app.use("/auth",require("./Routes/authentication"))
// app.use("/employee",require("./Routes/employeeList"))

app.listen(process.env.PORT,()=>{
    console.log("Listening on port",process.env.PORT);
})
