const express = require("express");
const router = express.Router();
const {getChildren, getChildById, addChild, deleteChild, updateChild, addCompletedTask} = require("../controllers/child-controller.js");

router.get('/', getChildren);
router.get('/byId',  getChildById);
router.post('/', addChild);
router.put('/completedTask', addCompletedTask);
router.put('/', updateChild);
router.delete('/', deleteChild);



module.exports = router;