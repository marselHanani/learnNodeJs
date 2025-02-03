// to create your structure of your model you should install mongoose if you want to use mongodb 
const mongoose = require('mongoose');
// create your schema object using mongoose
const noteSchema = mongoose.Schema({
    title :{
        type : String,
        required : [true,"the name is required"],// you can remove message and write => (required:true )
        unique : true,
        minLength:3,// you can add error message like required above 
        maxLength:100
    },
    content : {
        type : String,
        required : [true,"the content is required"]
    }
    // you can add more fields if you want to
})

// create your model from your schema 

    // first parameter is the name of your collection in mongodb , second is the schema
module.exports = mongoose.model('Note',noteSchema);
 // here you create your model and export it so you can use it in your controllers or routes