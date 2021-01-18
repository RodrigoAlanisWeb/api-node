const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

// Database
mongoose.connect('mongodb+srv://Rodrigo:Arkpexps4@ra-task-app.lyypw.mongodb.net/<task-app>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization,x-access-token")
    next();
});

// Routers
app.get('/', (req, res) => {
    res.json({
        'res': true,
        'msg': 'Hello You'
    })
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

// Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000')
});