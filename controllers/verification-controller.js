require("dotenv").config({ path: "../.env" });
const { sendVerificationEmail } = require("../verification/nodemailer.js");
const { checkEmailSF } = require("../verification/salesforce.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model.js");

//require('crypto').randomBytes(64).toString('hex')
//https://www.youtube.com/watch?v=mbsmsi7l3r4
//https://github.com/VUcept-Webapp/VUcept-Management-Backend/blob/main/controllers/authController.js
//https://github.com/VUcept-Webapp/VUcept-Management-Backend/blob/main/lib/constants.js
//https://github.com/ChangePlusPlusVandy/f2f-backend/blob/allan/controllers/verification-controller.js

/**
 * Generate the access token for login and signup
 * @param {Object} type - user type
 * @returns the access token string
 */
const generateAccessToken = (user) => {
  const newUser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    //schoolDistrict: user.schoolDistrict,
    zipCode: user.zipCode,
    phoneNumber: user.phoneNumber,
    children: user.children,
    posts: user.posts,
  };
  return jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

/**
 * the refresh token for login and signup; it has an expiration date of three days
 * @param {Object} type user type
 * @returns the refresh token string
 */
const generateRefreshToken = (user) => {
  const newUser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    //schoolDistrict: user.schoolDistrict,
    zipCode: user.zipCode,
    phoneNumber: user.phoneNumber,
    children: user.children,
    posts: user.posts,
  };
  return jwt.sign(newUser, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

/**
 * check the user's authentication status
 * @param {string} email
 * @param {string} password
 * @returns
 */
/*
const authenticateUser = async (email, password) =>{
  try {
    const checkResult = await checkUser(email);
    if (checkResult.length === 0) {
      return res.status(400).json("Incorrect user email");
    }
    const userData = checkResult[0];
    const inputHash = hashPassword(password,  userData.salt);
    if (inputHash ===  userData.hash){
      const email =  userData.email;
      const firstName =  userData.firstName;
      const lastName = userData.lastName;
      const schoolDistrict = userData.schoolDistrict;
      const zipCode = userData.zipCode;
      const phoneNumber = userData.phoneNumber;
      const children = userData.children;
      const posts = userData.posts;
      return ({
        res.status(200).json("User successfully authenticated"),
        user: {email, firstName, lastName, schoolDistrict, zipCode, phoneNumber, children, posts}
      });
      return ({status: STATUS_CODE.SUCCESS,
      user: { name,  email,  visions, type}});
    } else {
      return ({status: STATUS_CODE.INVALID_PASSWORD});
    }
  } catch(e){
    console.log(e);
    return ({status: STATUS_CODE.ERROR});
  }
}*/

// var jsforce = require("jsforce");
// const { URL, USERNAME, PASSWORD, TOKEN } = process.env;
// const conn = new jsforce.Connection({
//   loginUrl: URL,
// });

// conn.login(USERNAME, PASSWORD + TOKEN, (err, userInfo) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("User Id: " + userInfo.id);
//     console.log("Ord Id: " + userInfo.organizationId);
//   }
// });

const sendVerifEmail = async (req, res) => {
  try {
    var nodemailer = require("nodemailer");
    return res
      .status(200)
      .json(sendVerificationEmail(nodemailer, req.query.email));
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

const checkMongo = async (req, res) => {
  try {
    const users = await User.find({ email: req.query.email });
    if (users.length > 0) {
      return res.status(200).json({ status: "Found" });
    } else {
      return res.status(200).json({ status: "Not Found" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

const checkSF = async (req, res) => {
  try {
    let isEmail = await checkEmailSF(conn, req.query.email);
    return res.status(200).json(isEmail);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { sendVerifEmail, checkMongo, checkSF };