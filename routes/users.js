const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, addUser, addChild, deleteChild, deleteUser, updateUser} = require("../controllers/user-controller.js");


router.get('/',  getAllUsers);
router.get('/byId', getUserById);
router.post('/', addUser);
router.delete('/', deleteUser);
router.put('/', updateUser);
router.put('/addChild', addChild);
router.delete('/deleteChild', deleteChild);



module.exports = router;