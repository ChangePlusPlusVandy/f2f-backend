const User = require("../models/user.model.js");
const Child = require("../models/child.model.js");
const ObjectId = require("mongodb").ObjectId;
const fastCsv = require("fast-csv");
const { Readable } = require("stream");
const jwt = require("jsonwebtoken");

//gets all users in database
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const users = await User.find({ email: req.query.email });
    if (users.length > 0) {
      return res.status(200).send("Found");
    } else {
      return res.status(200).send("Not Found");
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//gets user by their userId:
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const user = await User.findById(userId);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Missing userId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//checks if email and password match
const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.find({ email: email });

    if (user.length === 0) {
      return res
        .status(400)
        .json({ message: "Could not find user with specified email" });
    }
    if (user[0].password === password) {
      const token = jwt.sign({ id: user[0]._id }, "secret-key", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "SUCCESS",
        token: token,
        id: user[0]._id.toString(),
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        children: user[0].children,
      });
    } else {
      return res.status(400).json({ message: "Incorrect Password" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//add a new user:
const addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message });
  }
};

//adds child to child array
const addChild = async (req, res) => {
  try {
    const userId = req.params.id;
    const childId = req.body.childId;
    if (userId && childId) {
      const user = await User.findById(userId);
      console.log(user);
      const child = await Child.findById(childId);
      console.log(child);
      if (user && child) {
        const updatedUser = await user.updateOne({
          $push: { children: childId },
        });
        return res.status(200).json(updatedUser);
      } else {
        return res
          .status(400)
          .json({ message: "Could not find user or child" });
      }
    } else {
      return res.status(400).json({ message: "Missing userId or childId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send({ message: err.message });
  }
};

//deletes child from child array
const deleteChild = async (req, res) => {
  try {
    const userId = req.params.id;
    const childId = req.body.childId;
    if (userId && childId) {
      const user = await User.findById(userId);
      const child = await Child.findById(childId);
      if (user && child) {
        const updatedUser = await user.updateOne({
          $pull: { children: childId },
        });
        const deletedChild = await Child.deleteOne({ _id: childId });
        console.log(deletedChild);

        return res.status(200).send(updatedUser);
      } else {
        return res
          .status(400)
          .json({ message: "Could not find user or child" });
      }
    } else {
      return res.status(400).json({ message: "Missing userId or childId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//delete a user:
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      console.log("here");
      const user = await User.deleteOne({ _id: userId })
        .then(() =>
          res.status(200).json({ message: "User deleted successfully" })
        )
        .catch((error) => res.status(400).json({ message: error }));
    } else {
      return res.status(400).json({ message: "Missing userId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//update a user:
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const user = await User.updateOne({ _id: userId }, req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "Missing userId" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

const exportDataToCSV = async (req, res) => {
  try {
    const users = await User.find(); // retrieve data from MongoDB

    // Create a CSV stream with Fast CSV
    const csvStream = fastCsv.format({ headers: true });

    // Map the user data to CSV format and push it to the stream
    users.forEach((user) => {
      const row = {
        id: user._id,
        email: user.email,
        passsword: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        //schoolDistrict: user.schoolDistrict,
        zipCode: user.zipCode,
        phoneNumer: user.phoneNumer,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: user.__v,
        // replace with your own fields
      };
      console.log(row);
      csvStream.write(row);
    });

    csvStream.end();

    // Set headers for CSV response
    res.setHeader("Content-disposition", "attachment; filename=users.csv");
    res.set("Content-Type", "text/csv");

    // Pipe CSV stream to response
    csvStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  loginUser,
  addUser,
  addChild,
  deleteChild,
  deleteUser,
  updateUser,
  exportDataToCSV,
};
