const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {firstname,lastname,email,password,phone} = req.body
    console.log(firstname,lastname,email,password,phone);
    
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exists!Try Login")
        }else{
            const newUser = new users({
                firstname,lastname,email,password,phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)

    }
}

// login
exports.loginController = async (req,res) => {
    console.log('Inside loginController')
    const { email, password } = req.body
    console.log(email, password)

    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.JWTpassword)
            res.status(200).json({
                user : existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid email/password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get all users - get
exports.getAllUserController = async (req,res) =>{
    console.log("Inside getAllUserController");
    try{
        const allusers = await users.find().select('-password');
        res.status(200).json(allusers)
    }catch(err){
        res.status(401).json(err)
    }
}

// get the current user
exports.getTheCurrentUserController = async (req,res)=>{
    console.log("Inside getTheCurrentUserController");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email}).select('-password')
        res.status(200).json(existingUser)
    }catch(err){
        res.status(401).json(err)
    }
}