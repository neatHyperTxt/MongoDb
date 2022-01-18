const Product = require('./models/product');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log("Oh No Mongo Connection Error Error!!!");
        console.log(err);
    })

const p = new Product(
    {
        name: 'Ruby GrapeFruit',
        price: 1.99,
        category: 'fruits'
    })
p.save().then((x) => {
    console.log(x);
})
    .catch(err => {
        console.log(err);
    })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetables'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruits'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruits'
    },
    {
        name: 'Organice Celery',
        price: 1.50,
        category: 'vegetables'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]
Product.insertMany(seedProducts)
.then(res=>
    {
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })