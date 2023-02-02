const Child = require('../models/child.model.js');
const Task = require('../models/task.model.js');
const ObjectId = require('mongodb').ObjectId;

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
            let updatedCompletedTaks = [];
            updatedCompletedTasks = child.completedTasks;
            updatedCompletedTasks.push(ObjectId(taskId));
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

//deletes child from child array
const deleteCompletedTask = async (req, res) => {
    try{
        const childId = req.body.childId;
        const taskId = req.body.taskId;
        if (taskId && childId){
            const child = await Child.findById(childId);
            const task = await Task.findById(ObjectId(taskId));
            if (child && task){
                let newTasks = [];
                newTasks = child.completedTasks;
                //console.log(newChildren);
                newTasks = newTasks.filter(t=> !(t.equals(ObjectId(taskId))));
                //console.log(newChildren);
                const updatedChild = await Child.updateOne(
                    {_id: childId},
                    {$set: {
                        completedTasks: newTasks
                    }}
                );
                return res.status(200).json(updatedChild);
            }
            else{
                return res.status(400).json({message: "Could not find child or task"});
            }
        }
        else{
            return res.status(400).json({message: "Missing childId or taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send({message: err.message});
    }
}




module.exports = {getChildren, getChildById, addChild, deleteChild, updateChild, addCompletedTask, deleteCompletedTask};
