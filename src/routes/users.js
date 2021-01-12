const express = require("express");
const router = express.Router();

const fileupload = require('express-fileupload');
const path = require('path');
const User = require('../models/User');
const verify_token = require('../verify_token');

router.use(fileupload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
    debug: true
}));

router.put('/',verify_token,async (req,res)=>{
    const { username,name,email } = req.body;
    const file = req.files.file;

    file.mv(path.join(__dirname,'../uploads/'+file.name),(err)=>{
        if (err) {
            return res.status(500).send({
                res: false,
                msg: err
            })
        }      
    })
    const query = await User.findOneAndUpdate({_id:req.userId},{
        username,
        name,
        email,
        image: file.name
    },{
        useFindAndModify: false
    });
    
    const user = await User.findById(req.userId);

    if (user) {
        return res.json({
            res: true,
            user
        });
    } else {
        return res.status(500).send({
            res: false
        });
    }
})

module.exports = router;