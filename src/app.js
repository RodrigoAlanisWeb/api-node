const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// Database
mongoose.connect('mongodb://localhost:27017/app-js',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Settings
app.set('port',process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routers
app.get('/',(req,res)=>{
    res.json({
        'res':true,
        'msg':'Hello You'
    })
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));

// Start the server
app.listen(app.get('port'),()=>{
    console.log('Server on port 3000')
});