require("dotenv").config({ path: "../.env" });
const { sendVerificationEmail } = require("../verification/nodemailer.js");
const { checkEmailSF } = require("../verification/salesforce.js");
const User = require('../models/user.model.js');

var jsforce = require("jsforce");
const { URL, USERNAME, PASSWORD, TOKEN } = process.env;
const conn = new jsforce.Connection({
  loginUrl: URL,
});

conn.login(USERNAME, PASSWORD + TOKEN, (err, userInfo) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User Id: " + userInfo.id);
    console.log("Ord Id: " + userInfo.organizationId);
  }
});

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
