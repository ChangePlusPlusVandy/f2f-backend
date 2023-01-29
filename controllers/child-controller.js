const Child = require('../models/child.model.js');
const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

//get all children:
const getChildren = async (req, res) => {
    try {
        const children = await Child.find({});
        return res.status(200).json(children);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//gets child by their childId:
const getChildById = async (req, res) => {
    try{
        const childId = req.query.childId;
        if (childId){
            const child = await Child.findById(childId);
            return res.status(200).json(child);
        }
        else{
            return res.status(400).json({message: "Missing childId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//add a new child:
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
        console.log(req.query.childId);
        const childId = req.query.childId;
        if (childId){
            const child = await Child.deleteOne({_id: childId})
            .then(() => res.status(200).json({message: "Child deleted successfully"}))
            .catch((error) => res.status(400).json({message: error}));
        }
        else{
            return res.status(400).json({message: "Missing childId"});
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
        const childId = req.body.childId;
        if (childId){
            const child= await Child.updateOne({childId}, req.body)
            return res.status(200).json(child);
        }
        else{
            return res.status(400).json({message: "Missing childId"});
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
        const {childId} = req.body;
        const {taskId} = req.body;
        if (childId && taskId){
            const task = await Task.findById(taskId);
            const child= await Child.findById(childId);
            //console.log(child);
            //console.log(child[0].completedTasks);
            let updatedCompletedTaks = [];
            updatedCompletedTasks = child.completedTasks;
            updatedCompletedTasks.push(taskId);
            const updatedChild = await Child.updateOne(
                {_id: childId},
                {$set: {
                    completedTasks: updatedCompletedTasks
                }}
            );
            return res.status(200).json(updatedChild);
        }
        else{
            return res.status(400).json({message: "Missing childId or taskId"});
        }

    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}




module.exports = {getChildren, getChildById, addChild, deleteChild, updateChild, addCompletedTask};
