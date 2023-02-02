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




//get task by specified attribute(s) in query
const getTaskByAttributes = async (req, res) => {
    try {
        const disability = req.query.disability;
        const age = req.query.age;
        const time = req.query.time;
        const allTasks = await Task.find();
        if (disability && age && time){
            console.log("here1");
            let filteredTasks = [];
            allTasks.forEach(task => {
                let dis = task.disabilities;
                for (let i = 0; i < dis.length; i++){
                    if (dis[i] === disability){
                        filteredTasks.push(task);
                    }
                }
            });
            let filteredByAgeAndTime = [];
            for(let i = 0; i < filteredTasks.length; i++){
                let curTask = filteredTasks[i];
                if (age>=curTask.minAge && age<=curTask.maxAge && curTask.timePeriod==time){
                    filteredByAgeAndTime.push(curTask);
                }
            }
            return res.status(200).json(filteredByAgeAndTime);
        }
        else if (disability && age){
            let filteredTasks = [];
            allTasks.forEach(task => {
                let dis = task.disabilities;
                for (let i = 0; i < dis.length; i++){
                    if (dis[i] === disability){
                        filteredTasks.push(task);
                    }
                }
            });
            let filteredByAge = [];
            for(let i = 0; i < filteredTasks.length; i++){
                let curTask = filteredTasks[i];
                if (age>=curTask.minAge && age<=curTask.maxAge){
                    filteredByAge.push(curTask);
                }
            }
            return res.status(200).json(filteredByAge);
        }
        else if (disability && time){
            let filteredTasks = [];
            allTasks.forEach(task => {
                let dis = task.disabilities;
                for (let i = 0; i < dis.length; i++){
                    if (dis[i] === disability){
                        filteredTasks.push(task);
                    }
                }
            });
            let filteredByTime = [];
            for(let i = 0; i < filteredTasks.length; i++){
                let curTask = filteredTasks[i];
                if (curTask.timePeriod==time){
                    filteredByTime.push(curTask);
                }
            }
            return res.status(200).json(filteredByTime);
        }
        else if (age && time){
            let filteredByAgeAndTime = [];
            for(let i = 0; i < allTasks.length; i++){
                let curTask = allTasks[i];
                if (age>=curTask.minAge && age<=curTask.maxAge && curTask.timePeriod==time){
                    filteredByAgeAndTime.push(curTask);
                }
            }
            return res.status(200).json(filteredByAgeAndTime);
        }
        else if (disability){
            let disabilityTasks = [];
            allTasks.forEach(task => {
                let dis = task.disabilities;
                for (let i = 0; i < dis.length; i++){
                    if (dis[i] === disability){
                        disabilityTasks.push(task);
                    }
                }
            });
            return res.status(200).json(disabilityTasks);
        }
        else if (age){
            let filteredByAge = [];
            for(let i = 0; i < allTasks.length; i++){
                let curTask = allTasks[i];
                if (age>=curTask.minAge && age<=curTask.maxAge){
                    filteredByAge.push(curTask);
                }
            }
            return res.status(200).json(filteredByAge);
        }
        else if (time){
            let filteredByTime = [];
            for(let i = 0; i < allTasks.length; i++){
                let curTask = allTasks[i];
                if (curTask.timePeriod == time){
                    filteredByTime.push(curTask);
                }
            }
            return res.status(200).json(filteredByTime);
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
        const allTasks = await Task.find();
        let disabilityTasks = [];
        allTasks.forEach(task => {
            let dis = task.disabilities;
            for (let i = 0; i < dis.length; i++){
                if (dis[i] === disability){
                    disabilityTasks.push(task);
                }
            }
        });
        return res.status(200).json(disabilityTasks);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
}

//get task by age:
const getTaskByAge = async (req, res) => {
    try{
        const age = req.query.age;
        const allTasks = await Task.find();
        let ageTasks = [];
        allTasks.forEach(task => {
            let minAge = task.minAge;
            let maxAge = task.maxAge;
            if (age >= minAge && age <= maxAge){
                ageTasks.push(task);
            }
        });
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
        const {title, details, disabilities, timePeriod, age} = req.body;
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
