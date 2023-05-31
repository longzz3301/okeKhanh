const express = require('express')
const {userModel} = require('./model/user')
const {orderModel} = require('./model/order')
const {inventoriesModel} = require('./model/Inventories')
const {InventoryRouter} = require('./ProductInventory')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/finaltest3')

app.use(express.json())

app.use('/api1',InventoryRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', async (req,res)=> {
    try {
      const user =await userModel.find({})
    console.log(user)
        
    } catch (error) {
        res.send(error)
        
    }


})

app.patch('/update/:quantity' ,async (req,res)=> {
    console.log("alo")
    try { 
      const {price,item} = req.body
      console.log(price,item)
      const {quantity} = req.params
      console.log(quantity)
      const checkQuantity = await orderModel.findOne({quantity:quantity})
      console.log(checkQuantity)
      if (checkQuantity.quantity <100) {
        
        const update = await orderModel.findOneAndUpdate({quantity:quantity},{price:price,item:item},{new:true})
        res.send(update)
      }else {
        res.send('guddproduct')
      }
      
        
        
    } catch (error) {
      res.send(error)
        
    }
})





const authentication = async (req, res, next) => {

  try {
      const { username, password } = req.body

  const checkUserExist = await userModel.findOne({ username: username,password:password })
  console.log(checkUserExist)
  
  if (checkUserExist) {
      const token = jwt.sign({ username: username,  }, 'long123')  
      res.send({ token: token })

  } else {
      res.send("user k ton tai")
  }
      
  } catch (error) {
      res.send(error)
      
  }
}

const checkToken = async (req, res, next) => {
  try { const token = req.headers.authorization.split(" ")[1]
  const decoded = jwt.verify(token, 'long123')
  const { username } = decoded
  const checkUser = await userModel.findOne({ username: username })   
  if (checkUser) {
      req.user = checkUser
      next()

  } else {
      res.send('user not exit ')
  }
   
  } catch (error) {
   res.send(error)
   
  }
}

const getOder = async (req,res,next) => {
  try { 
    const getOder = await orderModel.find({})
    res.send(getOder)
    
  } catch (error) {
    res.send(error)
    
  }

}


app.post('/login',authentication)
app.get('/getOder',checkToken,getOder)


//get the order 
app.post ('/order' , async (req,res)=> {
  try {
    const {item,price,quantity,idProduct} = req.body
    console.log(req.body)

  
  
  const getingOder = await orderModel.findOne({item:item,price:price,quantity:quantity}).populate('inventories')
  console.log(getingOder)
  
  res.send(getingOder)
    
  } catch (error) {
    res.send(error)
    
  }
  

})


app.listen(4000, () => {
  console.log('sever is okay')
})

