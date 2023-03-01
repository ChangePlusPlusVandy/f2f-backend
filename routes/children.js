const express = require("express");
const router = express.Router();
const {getChildren, getChildById, addChild, deleteChild, updateChild, addCompletedTask, deleteCompletedTask} = require("../controllers/child-controller.js");

router.get('/', getChildren);
router.get('/:id',  getChildById);
router.post('/', addChild);
router.put('/:id/completedTask', addCompletedTask);
router.put('/:id', updateChild);
router.delete('/:id', deleteChild);
router.delete('/:id/completedTask', deleteCompletedTask);



module.exports = router;