const mongoose = require('mongoose')
const uploadschema = new mongoose.Schema({
    filename:{
        type:String,
        unique:true,
        required:true
    },
    contentType:{
        type:String,
        required:true
    },
    imageBase64:{
        type:String,
        required: true
    }
})
module.exports=UploadModel = mongoose.model('uploads',uploadschema)