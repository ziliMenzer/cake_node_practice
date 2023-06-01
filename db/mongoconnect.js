const mongoose = require('mongoose');
const {config}=require('../config/secret');
main().catch(err => console.log(err));

async function main() {
    // let MONGO_URL='mongodb+srv://Zili:zili_pass10@cluster0.tqnfein.mongodb.net/basmach23';
    mongoose.set("strictQuery", false);
    await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.tqnfein.mongodb.net/basmach23`);
    console.log("black23 connected")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}