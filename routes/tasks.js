const express = require("express");
const router = express.Router();
const {getAllTasks, getTaskById, getTaskByAttributes, getTaskByAge, getTaskByDisability, getTaskByTime, createTask, updateTask, deleteTask} = require("../controllers/task-controller.js");

router.get('/',  getAllTasks);
router.get('/:id', getTaskById);
router.get('/byAttributes', getTaskByAttributes);
router.get('/byDisability', getTaskByDisability);
router.get('/byAge', getTaskByAge);
router.get('/byTime', getTaskByTime)
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);



module.exports = router;