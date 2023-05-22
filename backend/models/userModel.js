const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema =mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//login method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('please fill all the fields')
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return user
       
}

//signup method
userSchema.statics.signup = async function(email,password) {
    //cheack data is valid
    if(!email || !password){
        throw Error('please fill all the fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Email isnt valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    const exist = await this.findOne({email})
    if(exist){
        throw Error('Email already exsit')
    }
    const salt = await bcrypt.genSalt(10) //adding salt to password, the salt is charcters that concatante to the password
    const hash = await bcrypt.hash(password,salt)//hashing the password
    const user = await this.create({email,password:hash})//add to db
    return user

}

module.exports = mongoose.model('User',userSchema)