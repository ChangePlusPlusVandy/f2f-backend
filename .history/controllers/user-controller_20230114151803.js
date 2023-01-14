const User = require('../models/user.model.js');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } 
    catch(err){
        res.status(400).json({message: err});
    }
}

module.exports = {getAllUsers};
