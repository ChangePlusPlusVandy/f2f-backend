const User = require('../models/user.model.js');

//gets all users in database
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } 
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//gets user by their userId:
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try{
        if (userId){
            const user = await User.findById(req.params.id);
            return res.status(200).json(user);
        }
        else{
            return res.status(200).send("Invalid userID query");
        }
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//add a new user:
const addUser = async (req, res) => {
    try{
        const {email, password, firstName, lastName, schoolDistrict, zipCode, phoneNumber} = req.body;
        const newUser = await User.create(req.body);
        await newUser.save();
        return res.status(200).json(newUser);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}


//delete a user:
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try{
        if (userId){
            User.deleteOne({_id: userId}).then(() => 
                    res.status(200).json({ message: "User successfully deleted." })
                );
        }
        else{
            return res.status(500).send("Invalid userID query");
        }
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}

//update a user:
const updateUser = async (req, res) => {
    const userId = req.params.id;
    try{
        let user;
        if (userId){
            user = await User.findbyId(userId).exec();
        }
        else{
            return res.status(500).send("Invalid userID query");
        }
        const {email, password, firstName, lastName, schoolDistrict, zipCode, phoneNumber}  = req.body;
        console.log(req.body);
        if (email) user.email = email;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (schoolDistrict) user.schoolDistrict = schoolDistrict;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(400).send({message: err.message});
    }
}



module.exports = {getAllUsers, getUserById, addUser, deleteUser, updateUser};
