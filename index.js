const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}))
const Product = require('./models/product')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log("Oh No Mongo Connection Error Error!!!");
        console.log(err);
    })

//routes

app.get('/products',async (req,res)=>
{
    const products = await Product.find({})
    res.render('products/index',{products});
})

app.get('/products/:id',async (req,res)=>
{
    const {id} = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show',{foundProduct});
})
app.get('/productsNew',(req,res)=>
{
    res.render('products/new');
})

app.post('/products',(req,res)=>
{
    console.log(req.body);
    res.send('Making Your Product');
})

// port

app.listen(3000, () => {
    console.log('App is Listening on Port 3000');
})