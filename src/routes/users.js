const express = require("express");
const router = express.Router();

const path = require('path');
const User = require('../models/User');
const verify_token = require('../verify_token');

// Routes

router.put('/',verify_token,async (req,res)=>{
    const { username,name,email } = req.body;
    const file = req.files.file;

    const query = await User.findOneAndUpdate({_id:req.userId},{
        username,
        name,
        email,
        image: file.name
    },{
        useFindAndModify: false
    });
    
    if (query) {
        return res.json({
            res: true,
        });
    } else {
        return res.status(500).send({
            res: false
        });
    }
})

module.exports = router;