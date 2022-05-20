const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const config = require("../../config");

const mongod = new MongoMemoryServer();

module.exports.connect = async() => {
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

module.exports.closeDatabase = async() =>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.clearDatabase = async() =>{
    const collections = mongoose.connection.collections;
    for (const k in collections){
        const collection = collections[k];
        await collection.deleteMany();
    }
}