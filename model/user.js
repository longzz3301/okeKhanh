const mongoose = require('mongoose')
const express = require ('express')
mongoose.connect('mongodb://0.0.0.0:27017/finaltest3')



const userSchema = new mongoose.Schema({
    username : String,
    password: String,
    
})

const userModel = mongoose.model('user',userSchema)

module.exports = {userModel}