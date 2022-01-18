const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

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



// port

app.listen(3000, () => {
    console.log('App is Listening on Port 3000');
})