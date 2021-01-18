const express = require("express");
const router = express.Router();

const Task = require('../models/Task');
const verify_token = require('../verify_token');

// Routes

router.get('/',verify_token,async (req,res)=>{
    tasks = await Task.find({ user: req.userId.toString() });
    console.log(tasks);
    if (tasks) {
        return res.send({
            res: true,
            tasks
        })
    } else {
        return res.status(404).send({
            res: false,
            msg: 'Not Tasks For This User'
        })
    }
});

router.post('/',verify_token,async (req,res)=>{
    const { name,description } = req.body;
    const task = new Task({
        name,
        description,
        user: req.userId
    });
    const query = await task.save();

    if (query) {
        return res.send({
            res: true,
            task
        })
    } else {
        return res.status(500).send({
            res: false,
            msg: "Error"
        })
    }
});

router.get('/done/:id',async (req,res)=>{
    const query = Task.findOneAndUpdate({_id:req.params.id},{
        done: true
    },{
        useFindAndModify: false
    });

    if (query) {
        return res.send({
            res: true
        })
    } else {
        return res.status(500).send({
            res: false
        })
    }
})

router.delete('/:id', async (req,res)=>{
    const query = Task.deleteOne({_id:req.params.id});

    if (query) {
        return res.send({
            res: true
        })
    } else {
        return res.status(500).send({
            res: false
        })
    }
})

module.exports = router;