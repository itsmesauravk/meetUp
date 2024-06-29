const registerUser = require("../schema/login&register")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SignUpUser = async(req,res) =>{
    try {
        const {firstName,lastName,email,contact,dateOfBirth,gender,password} = req.body;
        // console.log(firstName,lastName,email,contact,dateOfBirth,gender,password)

        const salt = bcrypt.genSaltSync(10)
        const hashpassword = bcrypt.hashSync(password,salt)

        const user = await registerUser.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:contact,
            DOB:dateOfBirth,
            gender:gender,
            password:hashpassword
        })
         if(!user){
            return res.status(404).json({success:false,message:"Unable to register"})
        }else{
            return res.status(200).json({success:true,message:"Registered successfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
    
}

const loginUser = async(req,res) =>{
    try {
        const{email,password} = req.body;

        const user =await registerUser.findOne({email})
        if(!user){
            return res.status(404).json({success:false,message:"Unable to login email is incorrect"})
        }else{
            const checkPassword = await bcrypt.compare(password,user.password)
            if(!checkPassword){
                return res.status(404).json({success:false, message:"passeword is incorrect"})
            }else{
                const token = jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1h"})
                if(token){
                    return res.status(200).json({success:true, token: token, user: user._id})
                }
            }
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
   
}

const verifyUser = async(req,res) =>{
    try {
        const{id} = req.params;
        // const decode = jwt.verify(token,process.env.SECRET_KEY);
        // console.log(decode)
        // if(!decode){
        //     return res.status(404).json({success:false,message:"Unable to verify the user"})
        // }
            const showDetail = await registerUser.findById(id)
            if(showDetail){
            return res.status(200).json({success:true, showDetail})
        }else{
            return res.status(404).json({success:false,message:"Unable to show the user details"})
        }

    } catch (error) {
        return res.status(400).json({success:true,message:"error",error})
    }
}

const allUsers = async(req,res) =>{
    try {
        const allUsers = await registerUser.find()
        if(allUsers){
            return res.status(200).json({success:true, allUsers})
        }
    }catch (error) {
        console.log(error)
    }

}




module.exports = {SignUpUser,loginUser,verifyUser, allUsers}