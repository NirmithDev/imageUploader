const mongoose = require('mongoose');
const config = require("../../config");

const Connect = async() => {
    try{
       const con = await mongoose.connect(config.MONGO_URL,{
           useNewUrlParser:true,
           useUnifiedTopology:true
       }) 
       console.log(`MongoDB Connected:${con.connection.host}`)
    }catch(er){
        console.log(er)
        process.exit(1);
    };
}

module.exports = Connect