const mongoose = require('mongoose')
const express = require ('express')

mongoose.connect('mongodb://0.0.0.0:27017/finaltest3')

const inventoriesSchema = new mongoose.Schema({
    id: Number,
    skul: String,

    description: String,
    instock: Number,
})

const inventoriesModel = mongoose.model('inventories',inventoriesSchema)

module.exports = {inventoriesModel }