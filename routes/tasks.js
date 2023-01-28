const express = require("express");
const router = express.Router();
const {getAllTasks, getTaskById, getTaskByAge, getTaskByDisability, createTask, updateTask, deleteTask} = require("../controllers/task-controller.js");

router.get('/',  getAllTasks);
router.get('/byId', getTaskById);
router.get('/byDisability', getTaskByDisability);
router.get('/byAge', getTaskByAge);
router.post('/', createTask);
router.put('/', updateTask);
router.delete('/', deleteTask);


module.exports = router;