const express = require("express");
const router = express.Router();
const {getAllUsers, getUserById, addUser, addChild, deleteChild, deleteUser, updateUser} = require("../controllers/user-controller.js");


router.get('/',  getAllUsers);
router.get('/byId', getUserById);
router.post('/', addUser);
router.put('/addChild', addChild);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.delete('/deleteChild', deleteChild);



module.exports = router;