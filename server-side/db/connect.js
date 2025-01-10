const mongoose = require("mongoose");

/**
 * @function connectDB
 * @description Used to connect to the mongoDB database.
 * @requires mongoose - The library used to connect to the mongoDB database
 * */

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 10000,
            })
            .then(() => {
                console.log("DB Connetion Successfull");
            })
    } catch (error) {
        console.log("Connection Error: Mongo_db", err.message);
    }
}

module.exports = connectDB;