const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  getTaskByAttributes,
  getTaskByAge,
  getTaskByDisability,
  getTaskByTime,
  getTaskByPriority,
  createTask,
  updateTask,
  deleteTask,
  loadTaskCSV,
  getStats,
} = require("../controllers/task-controller.js");

router.post("/loadTaskCSV", loadTaskCSV);
router.get("/getStats", getStats);
router.get("/", getAllTasks);
router.get("/byPriority", getTaskByPriority);
router.get("/byAge", getTaskByAge);
router.get("/byAttributes", getTaskByAttributes);
router.get("/byDisability", getTaskByDisability);
router.get("/:id", getTaskById);
router.get("/byTime", getTaskByTime);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
