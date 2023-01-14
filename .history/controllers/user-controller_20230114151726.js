const User = require('../models/user.model.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
    } 
    catch(err){
        res.status(400).json({message: err});
    }
    return res.status(200).json(users);
}

module.exports = {getAllUsers};
