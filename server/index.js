const express = require("express")
const app = express()
const router = require("../server/route/route")
const connectDb = require("./connectDb")
const cors = require("cors")
require("dotenv").config()
connectDb()

PORT = 4000

// const crypto = require('crypto');
// const secretToken = crypto.randomBytes(32).toString('hex');
// console.log(secretToken);


app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use("/",router)

app.get("/",(req,res)=>{
res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})