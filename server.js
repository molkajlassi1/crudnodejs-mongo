const express = require('express')
const mongoose = require('mongoose')
const Product=require('./models/productModel')
const app = express()
app.use(express.json())
//routes

app.get('/products', async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if (!product)
            {
                return res.status(404).json({message:'cannot find any product'})
            }
            res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

app.put('/products/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID  ${id}'})
        }
        const UpdateProduct= await Product.findById(id);
        res.status(200).json(UpdateProduct);
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
})

app.get('/products/:id', async(req,res)=>{
    try {
        const{id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})





app.get('/',(req,res) =>{
    res.send('Hello node api')
})

app.get('/blog',(req,res) =>{
    res.send('Hello blog my name is nchallah nmout')
})

app.post('/product',async(req,res) =>{

 try {
    const product=await Product.create(req.body)
    res.status(200).json(product);
 } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
    
 }
})

mongoose.connect('mongodb://localhost:27017/test').then(() =>{

app.listen(3000, ()=>{
    console.log('connected to mongo')
    console.log('Node API app is running on port 3000')
})
    
}).catch(()=>{
    console.log(console.error)
}

)
