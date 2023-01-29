const User = require('../models/user.model.js');
const Child = require('../models/child.model.js');

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
        console.log(req.query.userId);
        const userId = req.query.userId;
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
        const {email, password, firstName, lastName, schoolDistrict, zipCode, phoneNumber, children} = req.body;
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
        const userId = req.body.userId;
        const childId = req.body.childId;
        if (userId && childId){
            const user = await User.find({_id: userId});
            const child = await Child.findById(childId);
            if (user && child){
                let newChildren = [];
                newChildren = user[0].children;
                newChildren.push(childId);
                const updatedUser = await User.updateOne(
                    {_id: userId},
                    {$set: {
                        children: newChildren
                    }}
                );
                return res.status(200).json(updatedUser);
            }
            else{
                return res.status(400).json({message: "Could not find user"});
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
        const userId = req.body.userId;
        const childId = req.body.childId;
        if (userId && childId){
            const user = await User.find({_id: userId});
            const child = await Child.findById(childId);
            if (user && child){
                let newChildren = [];
                newChildren = user[0].children;
                newChildren = newChildren.filter(child=> child !== childId);
                const updatedUser = await User.updateOne(
                    {_id: userId},
                    {$set: {
                        children: newChildren
                    }}
                );
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


//delete a user:
const deleteUser = async (req, res) => {
    try{
        console.log(req.query.userId);
        const userId = req.query.userId;
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
        const {userId} = req.body;
        if (userId){
            const user = await User.updateOne({userId}, req.body)
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
