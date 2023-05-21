const userModel =require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'2d'})
}
//login
const loginUser= async (req,res)=>{
    const {email,password}= req.body
    try{
        const user = await userModel.login(email, password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}



//signup
const signupUser= async (req,res)=>{
    const {email,password}= req.body
    try{
        const user = await userModel.signup(email, password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports={signupUser,loginUser}