const mongoose = require('mongoose')
const express = require ('express')
mongoose.connect('mongodb://0.0.0.0:27017/finaltest3')

const orderSchema = new mongoose.Schema({
    id:Number,
    item: {
        type: String,
        ref : "inventories"
    },

    price: Number,

    quantity:Number,
    // idProduct: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "inventories"
    // }

})

const orderModel = mongoose.model('order',orderSchema)

module.exports = {orderModel}