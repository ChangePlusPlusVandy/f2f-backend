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

/**
 * Selectively return tasks that matching the requirements:
 * disabilities, age, and priority
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
const getTaskByAttributes = async (req, res) => {
  try {
    const disabilities = req.query.disabilities
      ? JSON.parse(req.query.disabilities)
      : null;
    const age = req.query.age ? JSON.parse(req.query.age) : null;
    const priority = req.query.priority ? JSON.parse(req.query.priority) : null;

    const query = {};
    if (disabilities) {
      query.disabilities = { $in: disabilities };
    }
    if (age) {
      query.age = age;
    }
    if (priority) {
      query.priority = { $gt: priority };
    }
    const tasks = await Task.find(query);
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//get task by disability
const getTaskByDisability = async (req, res) => {
  try {
    const disabilities = JSON.parse(req.query.disabilities);
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
 * return the number of all tasks the user needs to complete and
 * the number of high priority tasks the user needs to complete
 */
const getStats = async (req, res) => {
  try {
    const disabilities = req.query.disabilities
      ? JSON.parse(req.query.disabilities)
      : null;
    const age = req.query.age ? JSON.parse(req.query.age) : null;
    const priority = req.query.priority ? JSON.parse(req.query.priority) : null;

    const allQuery = {};
    const priorityQuery = {};
    if (disabilities) {
      allQuery.disabilities = { $in: disabilities };
      priorityQuery.disabilities = { $in: disabilities };
    }
    if (age) {
      allQuery.age = age;
      priorityQuery.age = age;
    }
    if (priority) {
      priorityQuery.priority = { $gt: priority };
    }

    const numAll = await Task.countDocuments(allQuery);
    const numUpcoming = await Task.countDocuments(priorityQuery);
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
