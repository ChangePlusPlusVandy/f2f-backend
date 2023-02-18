const Task = require('../models/task.model.js');


//get all tasks:
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } 
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}


//get task by taskId:
const getTaskById = async (req, res) => {
    try{
        console.log(req.query.taskId);
        const taskId = req.query.taskId;
        if (taskId){
            const task = await Task.findById(req.query.taskId);
            return res.status(200).json(task);
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

function mongoQueryHelper(prop,value){
    return value != null ? {prop: value} : null;
}
 

const getTaskByAttributes = async (req, res) => {
    try {
        const disability = req.query.disability;
        const age = req.query.age;
        const time = req.query.time;
        if (disability && age && time){
            let filteredTasks = await Task.find({
                disabilities: disability, 
                timePeriod: time,
                age: age,
            });
            return res.status(200).json(filteredTasks);
        }
        else if (disability && age){
            let filteredTasks = await Task.find({
                disabilities: disability, 
                age: age,
            });
            return res.status(200).json(filteredTasks);
        }
        else if (disability && time){
            let filteredTasks = await Task.find({
                disabilities: disability, 
                timePeriod: time,
            });
            return res.status(200).json(filteredTasks);
        }
        else if (age && time){
            let filteredTasks = await Task.find({
                timePeriod: time,
                age: age,
            });
            return res.status(200).json(filteredTasks);
        }
        else if (disability){
            let filteredTasks = await Task.find({
                disabilities: disability
            });
            return res.status(200).json(filteredTasks);
        }
        else if (age){
            let filteredTasks = await Task.find({
                age: age
            });
            return res.status(200).json(filteredTasks);
        }
        else if (time){
            let filteredTasks = await Task.find({
                timePeriod: time
            });
            return res.status(200).json(filteredTasks);
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}



//get task by disability
const getTaskByDisability = async (req, res) => {
    try{
        const disability = req.query.disability;
        const filteredTasks = await Task.find({
            disabilities: disability
        });
        return res.status(200).json(filteredTasks);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//get task by age:
const getTaskByAge = async (req, res) => {
    try{
        const ageFilter = req.query.age;
        console.log(ageFilter);
        let ageTasks = await Task.find({age: ageFilter});
        return res.status(200).json(ageTasks);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }

}

//get task by time:
const getTaskByTime = async (req, res) => {
    try{
        const time = req.query.time;
        const allTasks = await Task.find({timePeriod: time});
        return res.status(200).json(allTasks);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}




//create a new task:
const createTask = async (req, res) => {
    try{
        const newTask = await Task.create(req.body);
        await newTask.save();
        return res.status(200).json(newTask); 
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//update a task:
const updateTask = async (req, res) => {
    try{
        const taskId = req.body.taskId;
        if (taskId){
            const task = await Task.updateOne({taskId}, req.body)
            return res.status(200).json(task);
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//delete a task:
const deleteTask = async (req, res) => {
    try{
        const {taskId} = req.query;
        if (taskId){
            const task = await Task.deleteOne({_id: taskId})
            .then(() => res.status(200).json({message: "Task deleted successfully"}))
            .catch((error) => res.status(400).json({message: error}));
        }
        else{
            return res.status(400).json({message: "Missing taskId"});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}



module.exports = {getAllTasks, getTaskById, getTaskByAttributes, getTaskByDisability, getTaskByAge, getTaskByTime, createTask, updateTask, deleteTask};