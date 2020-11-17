const mongoose = require('mongoose');

const URI = 'mongodb+srv://dbUser:dbUser@cluster0.hgpvh.mongodb.net/mern_shopping?retryWrites=true&w=majority'


const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('MongoDB connected...!');
}

module.exports = connectDB;