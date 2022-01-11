const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp')
.then(()=>
{
    console.log('Connection Open');
})
.catch(err=>
{
    console.log('Oh No Error');
    console.log(err);
})


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20
    },
    price:{
        type:Number,
        required:true
        min:0
    },
    onsale:{
        type:Boolean,
        default:false
    }
})


const Product = mongoose.model('Product',productSchema);

const bike = new Product({name:'Bike Helmet From Helmet Makers',price:29.50});
bike.save()
.then(data=>{
    console.log('It Worked');
    console.log(data);
})
.catch(err=>
    {
        console.log('Oh No Error!!!');
        console.log(err);
    })