const multer = require('multer');

//set storage
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        var ext= file.originalname.substr(file.originalname.lastIndexOf('.'));
        var name= file.originalname.split('.');
        console.log(name)
        console.log(ext)
        cb(null,name[0]+"-"+Date.now()+ext)
    }
})
module.exports = store = multer({storage:storage})