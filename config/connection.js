const mongoose = require('mongoose');
const config = require('config');


// DB Config
const db = config.get('mongoURI');


const connectDB = async () => {
    await mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
    console.log('MongoDB connected...!');
}

module.exports = connectDB;