const User = require('../models/user.model.js');
const Child = require('../models/child.model.js');
const ObjectId = require('mongodb').ObjectId;

//gets all users in database
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//gets user by their userId:
const getUserById = async (req, res) => {
    try{
        const userId = req.params.id;
        if (userId){
            const user = await User.findById(userId);
            return res.status(200).json(user);
        }
        else{
            return res.status(400).json({message: "Missing userId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//add a new user:
const addUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        await newUser.save();
        return res.status(200).json(newUser);
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}


//adds child to child array
const addChild = async (req, res) => {
    try{
        const userId = req.params.id;
        const childId = req.body.childId;
        if (userId && childId){
            const user = await User.findById(userId);
            console.log(user);
            const child = await Child.findById(childId);
            console.log(child);
            if (user && child){
                const updatedUser = await user.updateOne({
                    $push: {children: childId}
                });
                return res.status(200).json(updatedUser);
            }
            else{
                return res.status(400).json({message: "Could not find user or child"});
            }
        }
        else{
            return res.status(400).json({message: "Missing userId or childId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}

//deletes child from child array
const deleteChild = async (req, res) => {
    try{
        const userId = req.params.id;
        const childId = req.body.childId;
        if (userId && childId){
            const user = await User.findById(userId);
            const child = await Child.findById((childId));
            if (user && child){
                const updatedUser = await user.updateOne({
                    $pull: {children: childId}
                });
                const deletedChild = await Child.deleteOne({_id: childId});
                console.log(deletedChild);

                return res.status(200).send(updatedUser);
            }
            else{
                return res.status(400).json({message: "Could not find user or child"});
            }
        }
        else{
            return res.status(400).json({message: "Missing userId or childId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}


//delete a user:
const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id;
        if (userId){
            console.log("here");
            const user = await User.deleteOne({_id: userId})
            .then(() => res.status(200).json({message: "User deleted successfully"}))
            .catch((error) => res.status(400).json({message: error}));
        }
        else{
            return res.status(400).json({message: "Missing userId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//update a user:
const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        if (userId){
            const user = await User.updateOne({_id: userId}, req.body)
            return res.status(200).json(user);
        }
        else{
            return res.status(400).json({message: "Missing userId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}




module.exports = {getAllUsers, getUserById, addUser, addChild, deleteChild, deleteUser, updateUser};
