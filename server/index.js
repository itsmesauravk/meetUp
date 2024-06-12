const express = require("express")
const app = express()
const router = require("../server/route/route")
const routerPost = require("../server/route/postRoute")
const commentRouter = require("../server/route/commentRoute")
const likeRouter = require("../server/route/likeRoute")
const connectDb = require("./connectDb")
const cors = require("cors")
require("dotenv").config()
connectDb()

PORT = 4000

// const crypto = require('crypto');
// const secretToken = crypto.randomBytes(32).toString('hex');
// console.log(secretToken);


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin:"http://localhost:3000",
    // origin: "https://meet-up-ashy.vercel.app",
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
}))

app.use("/",router)
app.use("/",routerPost)
app.use("/",commentRouter)
app.use("/",likeRouter)

app.use("/uploads", express.static('uploads'))

app.get("/",(req,res)=>{
res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})