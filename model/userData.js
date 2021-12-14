const mongoose = require('mongoose')
const schema = mongoose.Schema
const detailsSchema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone :{
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type : Number,
        required : true,
        default : 1
    }
})
const userData = new mongoose.model('User Data',detailsSchema)
module.exports = userData