const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const farmSchema = Schema({
    name:{
        type:String,
        required:[true,'Farm must have a name']
    },
    city:{
        type:String
    },
    email:{
        type:String,
        required:[true,'Email Required']
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
})
const Farm = model('Farm',farmSchema);

module.exports = Farm;