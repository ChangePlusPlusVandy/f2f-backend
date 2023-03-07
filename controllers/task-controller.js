const Task = require("../models/task.model.js");

//get all tasks:
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//get task by taskId:
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (taskId) {
      const task = await Task.findById(taskId);
      return res.status(200).json(task);
    } else {
      return res.status(400).json({ message: "Missing taskId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

const getTaskByAttributes = async (req, res) => {
  try {
    const disabilities = req.body.disabilities;
    const age = req.query.age;
    const priority = req.query.priority;
    if (disabilities && age && priority) {
      let filteredTasks = await Task.find({
        disabilities: { $in: disabilities },
        age: age,
        priority: priority,
      });
      return res.status(200).json(filteredTasks);
    } else if (disabilities && age) {
      let filteredTasks = await Task.find({
        disabilities: { $in: disabilities },
        age: age,
      });
      return res.status(200).json(filteredTasks);
    } else if (disabilities && priority) {
      let filteredTasks = await Task.find({
        disabilities: { $in: disabilities },
        priority: priority,
      });
      return res.status(200).json(filteredTasks);
    } else if (age && priority) {
      let filteredTasks = await Task.find({
        priority: priority,
        age: age,
      });
      return res.status(200).json(filteredTasks);
    } else if (disabilities) {
      let filteredTasks = await Task.find({
        disabilities: { $in: disabilities },
      });
      return res.status(200).json(filteredTasks);
    } else if (age) {
      let filteredTasks = await Task.find({
        age: age,
      });
      return res.status(200).json(filteredTasks);
    } else if (priority) {
      let filteredTasks = await Task.find({
        priority: priority,
      });
      return res.status(200).json(filteredTasks);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//get task by disability
const getTaskByDisability = async (req, res) => {
  try {
    const disabilities = req.body.disabilities;
    const filteredTasks = await Task.find({
      disabilities: { $in: disabilities },
    });
    return res.status(200).json(filteredTasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//get task by age:
const getTaskByAge = async (req, res) => {
  try {
    const age = req.query.age;
    let ageTasks = await Task.find({
      age: age,
    });
    return res.status(200).json(ageTasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//get task by time:
const getTaskByTime = async (req, res) => {
  try {
    const time = req.query.time;
    const allTasks = await Task.find({ timePeriod: time });
    return res.status(200).json(allTasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//get task by priority:
const getTaskByPriority = async (req, res) => {
  try {
    const priority = req.body.priority;
    console.log(priority);
    const allTasks = await Task.find({ priority: priority });
    return res.status(200).json(allTasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//create a new task:
const createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    await newTask.save();
    return res.status(200).json(newTask);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//update a task:
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (taskId) {
      const task = await Task.updateOne({ taskId }, req.body);
      return res.status(200).json(task);
    } else {
      return res.status(400).json({ message: "Missing taskId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//delete a task:
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (taskId) {
      const task = await Task.deleteOne({ _id: taskId })
        .then(() =>
          res.status(200).json({ message: "Task deleted successfully" })
        )
        .catch((error) => res.status(400).json({ message: error }));
    } else {
      return res.status(400).json({ message: "Missing taskId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

/**
 * Take the CSV file converted JSON objects and
 * insert them in the Task database atomically
 * @param {Object} req
 * @param {Object} res
 */
const loadTaskCSV = async (req, res) => {
  const tasks = req.body;
  Task.insertMany(tasks)
    .then((savedTasks) => {
      return res.status(200).json(savedTasks);
    })
    .catch((err) => {
      console.error("Error saving documents:", err);
      return res.status(500).send({ message: err.message });
    });
};

/**
 * Return a user's stats of the tasks, including all tasks and
 * high priority tasks
 * @param {Object} req
 * @param {Object} res
 */
const getStats = async (req, res) => {
  // get user info from cache
  // const user = req.user;
  try {
    const numAll = await Task.countDocuments({});
    // TODO: Use upcoming or Priority? And fix priority level
    const numUpcoming = await Task.countDocuments({ priority: { $gt: 2 } });
    return res.status(200).json({ numAll, numUpcoming });
  } catch (err) {
    console.error("Error counting documents:", err);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  getTaskByAttributes,
  getTaskByDisability,
  getTaskByAge,
  getTaskByTime,
  getTaskByPriority,
  createTask,
  updateTask,
  deleteTask,
  loadTaskCSV,
  getStats,
};
