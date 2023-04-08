const Child = require("../models/child.model.js");
const Task = require("../models/task.model.js");
const ObjectId = require("mongodb").ObjectId;

//get all children:
const getChildren = async (req, res) => {
  try {
    const children = await Child.find({});
    return res.status(200).json(children);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

/**
 * Find an array of children based on an array of children id
 * @param {Object} req
 * @param {Object} res
 * @returns an array of children based on given Id
 */
const getChildrenByIdBatch = async (req, res) => {
  try {
    const childrenId = JSON.parse(req.query.id);
    if (childrenId) {
      const children = await Child.find({ _id: { $in: childrenId } });
      return res.status(200).json(children);
    } else {
      return res.status(400).json({ message: "Missing childrenId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//gets child by their childId:
const getChildById = async (req, res) => {
  try {
    const childId = req.params.id;
    if (childId) {
      const child = await Child.findById(childId);
      return res.status(200).json(child);
    } else {
      return res.status(400).json({ message: "Missing childId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//add a new child:
const addChild = async (req, res) => {
  try {
    const newChild = await Child.create(req.body);
    await newChild.save();
    return res.status(200).json(newChild);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//delete a child:
const deleteChild = async (req, res) => {
  try {
    const childId = req.params.id;
    if (childId) {
      const child = await Child.deleteOne({ _id: childId })
        .then(() =>
          res.status(200).json({ message: "Child deleted successfully" })
        )
        .catch((error) => res.status(400).json({ message: error }));
    } else {
      return res.status(400).json({ message: "Missing childId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//update a Child:
const updateChild = async (req, res) => {
  try {
    const childId = req.params.id;
    if (childId) {
      console.log(childId);
      const chil = await Child.findById(childId);
      console.log(chil);
      const child = await Child.updateOne({ _id: childId }, req.body);
      console.log(child);
      return res.status(200).json(child);
    } else {
      return res.status(400).json({ message: "Missing childId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//add completed Task:
const addCompletedTask = async (req, res) => {
  try {
    const childId = req.params.id;
    const taskId = req.body.taskId;
    if (childId && taskId) {
      const task = await Task.findById(taskId);
      const child = await Child.findById(childId);
      const updatedChild = await child.updateOne({
        $push: { completedTasks: task },
      });
      return res.status(200).json(updatedChild);
    } else {
      return res.status(400).json({ message: "Missing childId or taskId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//deletes child from child array
const deleteCompletedTask = async (req, res) => {
  try {
    const childId = req.params.id;
    const taskId = req.body.taskId;
    if (taskId && childId) {
      const child = await Child.findById(childId);
      const updatedChild = await child.updateOne({
        $pull: { completedTasks: taskId },
      });
      return res.status(200).json(updatedChild);
    } else {
      return res.status(400).json({ message: "Could not find child or task" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message });
  }
};

module.exports = {
  getChildren,
  getChildrenByIdBatch,
  getChildById,
  addChild,
  deleteChild,
  updateChild,
  addCompletedTask,
  deleteCompletedTask,
};
