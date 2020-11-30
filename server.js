const express = require('express');
const path = require('path');


const app = express(); 
const cors = require('cors');

//enable all CORS requests
app.use(cors());

// Parse request body
app.use(express.json({ extended: false})); 


// DB Config and connect to Mongodb
const connectDB = require('./config/connection');

connectDB();

// use Routes
app.use('/api/items', require('./route/api/items'));
app.use('/api/users', require('./route/api/users'));
app.use('/api/auth', require('./route/api/auth'));

// Serve static assets in Production mode
if ( process.env.NODE_ENV === 'production') {    
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}
// set Port
const Port = process.env.PORT || 3300;

app.listen( Port, ()=> console.log(`Server started on port ${Port}`));

