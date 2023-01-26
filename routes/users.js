const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, addUser, deleteUser, updateUser} = require("../controllers/user-controller.js");


router.get('/',  getAllUsers);
router.get('/byId', getUserById);
router.post('/', addUser);
router.delete('/', deleteUser);
router.put('/', updateUser);



module.exports = router;