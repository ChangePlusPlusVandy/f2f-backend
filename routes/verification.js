const express = require("express");
const { sendVerifEmail } = require("../controllers/verification-controller");
const { checkMongo } = require("../controllers/verification-controller");
const { checkSF } = require("../controllers/verification-controller");

const router = express.Router();

router.get('/checkMongo', checkMongo);
router.get('/sendEmail', sendVerifEmail);
router.get('/checkSF', checkSF);

module.exports = router;