const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, addUser, addChild, deleteChild, deleteUser, updateUser} = require("../controllers/user-controller.js");


router.get('/',  getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.put('/:id/addChild', addChild);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.delete('/:id/deleteChild', deleteChild);



module.exports = router;