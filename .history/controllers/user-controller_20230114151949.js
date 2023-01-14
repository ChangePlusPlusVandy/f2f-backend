const User = require('../models/user.model.js');

//gets all users in database
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } 
    catch(err){
        res.status(400).json({message: err});
    }
}

//gets user by their userId:
const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({message: err});
    }
}

module.exports = {getAllUsers};
