const Child = require('../models/child.model.js');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');
const ObjectId = require('mongodb').ObjectId;




//gets child by their userId:
//request should look like: http://localhost:3001/users/byId/?userId=63c322ad12574d3da04361c8
const getChildById = async (req, res) => {
    try{
        console.log(req.body.userId);
        const userId = req.body.userId;
        if (userId){
            const user = await User.find(ObjectId(userId));
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
const addChild = async (req, res) => {
    try{
        const newChild = await Child.create(req.body);
        await newChild.save();
        return res.status(200).json(newChild);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//delete a child:
const deleteChild = async (req, res) => {
    try{
        console.log(req.body.userId);
        const userId = req.body.userId;
        if (userId){
            console.log("here");
            const user = await Child.deleteOne({_id: userId})
            .then(() => res.status(200).json({message: "Child deleted successfully"}))
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

//update a Child:
const updateChild = async (req, res) => {
    try{
        const {userId} = req.body;
        if (userId){
            const child= await Child.updateOne({userId}, req.body)
            return res.status(200).json(child);
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

//add completed Task:
const addCompletedTask = async (req, res) => {
    try{
        const {userId} = req.body;
        const {taskId} = req.body;
        if (userId){
            const child= await Child.find(ObjectId(userId));
            console.log(child);
            console.log(child[0].completedTasks);
            let updatedCompletedTasks = [];
            updatedCompletedTasks = child[0].completedTasks;
            updatedCompletedTasks.push(taskId);
            const updatedChild = await Child.updateOne(
                {_id: req.body.userId},
                {$set: {
                    completedTasks: updatedCompletedTasks
                }}
            );
            return res.status(200).json(updatedChild);
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




module.exports = {getChildById, addChild, deleteChild, updateChild, addCompletedTask};
