const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  loginUser,
  addUser,
  addChild,
  deleteChild,
  deleteUser,
  updateUser,
  exportDataToCSV,
} = require("../controllers/user-controller.js");

router.get("/exportCSV", exportDataToCSV);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id/addChild", addChild);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/:id/deleteChild", deleteChild);

module.exports = router;
