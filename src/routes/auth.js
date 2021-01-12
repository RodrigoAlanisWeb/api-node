const express = require("express");
const router = express.Router();

// requeriments

const { secret } = require("../secret");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const verify_token = require('../verify_token');
const fileupload = require('express-fileupload');
const path = require('path');

// routes

router.use(fileupload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
    debug: true
}));

router.post("/singup", async (req, res) => {
    const { name, username, email, password } = req.body;
    const user = new User({
        name,
        username,
        email,
        password,
        image: req.files.file.name
    });

    const encrypt = await user.encrypt_password(password);
    user.password = encrypt;

    const file = req.files.file;

    file.mv(path.join(__dirname,'../uploads/'+file.name),(err)=>{
        if (err) {
            return res.status(500).send({
                res: false,
                msg: err
            })
        }      
      })

    const query = await user.save();


    

    if (query){
        const token = await jwt.sign({id: user._id},secret,{
            expiresIn: 60 * 60 * 60 * 24,
        });

        return res.send({
            'res': true,
            'auth': true,
            token,
            expires_in: '1 day'

        });
    } else {
        return res.status(500).send({
            'res': false,
            'msg': 'Error Al Crear El Usuario'
        });
    }
});

router.post('/login', async (req,res)=>{
    const { email,password } = req.body;
    const user = await User.find({'email':email});
    
    if (user[0]._id){
        verify = await bcrypt.compare(password,user[0].password);
        if(verify){
            token = jwt.sign({id: user[0]._id},secret,{
                expiresIn: 60 * 60 * 60 * 24
            })
            return res.send({
                'res': true,
                'auth': true,
                token,
                expires_in: '1 day'
            });
        } else {
            return res.status(401).send({
                'res': true,
                'msg': "The password doesnt link with the acount"
            });
        }
    } else {
        return res.status(401).send({
            'res': true,
            'msg': "The email doestn link with a acount"
        });
    }
});

router.get('/profile',verify_token,async (req,res,next)=>{
    const user = await User.findById(req.userId);
    
    return res.send({
        'res':true,
        'auth':true,
        'data': {
            "name": user.name,
            "username": user.username,
            "email": user.email,
            "image": user.image,
        }
    });
})

// Export

module.exports = router