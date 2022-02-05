const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Farm = require('./models/farm');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
const Product = require('./models/product')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStandTake2')
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log("Oh No Mongo Connection Error Error!!!");
        console.log(err);
    })

// Farm Routes

app.get('/farms',async (req,res)=>
{
    const farms = await Farm.find({});
    res.render('farms/index',{farms});
})
app.get('/farms/new',(req,res)=>
{
    res.render('farms/new');
})
app.get('/farms/:id',async (req,res)=>
{
    const {id} = req.params;
    const foundFarm = await Farm.findById(id).populate('products');
    res.render('farms/show',{foundFarm}); 
})
app.post('/farms',async (req,res)=>
{
    const farm =  new Farm(req.body);
    await farm.save();
    res.redirect('/farms');
})
app.get('/farms/:id/products/new',async (req,res)=>
{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new',{categories,id,farm});
})
app.post('/farms/:id/products',async (req,res)=>
{
    const {id} = req.params;
    const currentFarm = await Farm.findById(id);
    const {name,price,category} = req.body;
    const newProduct = new Product({name,price,category});
    currentFarm.products.push(newProduct);
    newProduct.farm = currentFarm;
    await currentFarm.save();
    await newProduct.save();
    res.redirect(`/farms/${id}`);
})

const categories = ['fruits','vegetables','dairy'];





//Product Routes

app.get('/products',async (req,res)=>
{
    const {category} = req.query;
    if(category)
    {
        const products = await Product.find({category});
        res.render('products/index',{products,category});
    }
    else{
        const products = await Product.find({});
        res.render('products/index',{products,category:'All'});
    }
})
app.get('/products/new',(req,res)=>
{
    res.render('products/new',{categories});
})
app.post('/products',async (req,res)=>
{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id',async (req,res)=>
{
    const {id} = req.params;
    const foundProduct = await Product.findById(id).populate('farm','name');
    console.log(foundProduct);
    res.render('products/show',{foundProduct});
})
app.get('/products/:id/edit',async (req,res)=>
{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product,categories});
})
app.put('/products/:id',async (req,res)=>
{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${product._id}`);
})
app.delete('/products/:id',async (req,res)=>
{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

// port

app.listen(3000, () => {
    console.log('App is Listening on Port 3000');
})




const divide = (x,y,callback)=>
{
    callback(x,y);
}
const callback = (x,y)=>
{
    console.log(x/y);
    console.log(x%y);
}