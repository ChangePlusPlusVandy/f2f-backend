import User from '../models/User';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
    } 
    catch(err){
        res.status(400).json({message: err});
    }
    if (!users){
        return res.status(400).json({message: "No users found"});
    }
    return res.status(200).json({users});
}