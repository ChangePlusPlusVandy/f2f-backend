const express = require("express");
const router = express.Router();
const { route } = require('express/lib/application');
const User = require('../models/user.model');


router.get('/', async (req, res)=> {
    try{
        const users = await User.find({});
        return res.json(users);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

router.get('/:id', async (req, res)=> {
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    }
    catch(err){
        res.status(400).json({message: err});
    }
});

router.post('/add', async(req, res)=> {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        schooldistrict: req.body.schooldistrict,
        zipcode: req.body.zipcode,
        phonenumber: req.body.phonenumber
    });
    try{
        const savedUser=await user.save();
        res.json(savedUser);
        res.send(res.status(200).json(savedUser));
    }
    catch(err){
        res.json({message: err});
    }
});

router.delete('/:id', async(req, res)=> {
    try{
        const removedUser = await User.remove({_id: req.params.id})
        res.json(removedUser)
    }
    catch(err){
        res.json({message: err});
    }
});

router.patch('/edit/:id', async(req, res)=> {
    try{
        const updatedUser = await User.updateOne({_id: req.params.id}, 
            {$set: {
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                schooldistrict: req.body.schooldistrict,
                zipcode: req.body.zipcode,
                phonenumber: req.body.phonenumber
            }}
        );
        res.json(updatedUser);
    }
    catch(err){
        res.json({message: err});
    }
});


module.exports = router;