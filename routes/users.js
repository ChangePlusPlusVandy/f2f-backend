const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, addUser, deleteUser, updateUser} = require("../controllers/user-controller.js");


router.get('/',  getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);



module.exports = router;