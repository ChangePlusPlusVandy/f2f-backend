const express = require("express");
const routerSTask = express.Router();

const {
  getAllSTasks,
  addSTask,
  loadRoadmapCSV,
} = require("../controllers/spreadsheetTask-controller.js");

routerSTask.get("/", getAllSTasks);
routerSTask.post("/", addSTask);
routerSTask.post("/loadRoadmapCSV", loadRoadmapCSV);

module.exports = routerSTask;
