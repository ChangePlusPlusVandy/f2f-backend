const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require('mongoose');
const VerifyToken = require("./middlewares/VerifyToken");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow cross-origin requests (for frontend to communicate with backend on different ports/address)
app.use(express.json()); // Parses incoming JSON requests and uts the parsed data in req
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlenconded payloads

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("connected to DB!√")
});
/**
 * Uses the VerifyToken middleware to protect the data route
 * Use the VerifyToken to protect all routes that require authentication
 */
app.use("/data", VerifyToken, require("./routes/users"));

app.get("/", (req, res) => { // Default route: Unprotected
    res.send("Express Auth Temp!!");
});

const usersRouter = require('./routes/users');
const childrenRouter =  require('./routes/children');
const tasksRouter = require('./routes/tasks');
app.use('/users', usersRouter);
app.use('/children', childrenRouter);
app.use('/tasks', tasksRouter);

//const postsRouter =  require('./routes/posts');
//app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});