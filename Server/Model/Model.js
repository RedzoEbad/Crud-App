const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    Id : {
        type : String,
        required : true
    },
    Names: {
      type : String,
      required : true
    },
    Age : {
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required : true
    },
    Status : {
        type : String,
        required : true,
    }
})

const Crud = mongoose.model('Crud' , ModelSchema);
module.exports = Crud ; 