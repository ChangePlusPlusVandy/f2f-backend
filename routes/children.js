const express = require("express");
const router = express.Router();
const {getChildById, addChild, deleteChild, updateChild, addCompletedTask} = require("../controllers/child-controller.js");


router.get('/',  getChildById);
router.post('/', addChild);
router.put('/', updateChild);
router.put('/completedTask', addCompletedTask);
router.delete('/', deleteChild);



module.exports = router;