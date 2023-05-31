const express = require('express')
const {inventoriesModel} = require('./model/Inventories')
const InventoryRouter =express.Router()

InventoryRouter.get('/get' ,async ( req,res) => {
    try {
        const GetAll = await inventoriesModel.find({})
        console.log(GetAll)
        res.send(GetAll)
        
    } catch (error) {
        res.send(error)
        
    }
})

module.exports = {InventoryRouter}