const sTask = require("../models/spreadsheetTask.model.js");
const csv = require("fast-csv");

//get all tasks:
exports.getAllSTasks = async (req, res) => {
  try {
    const {
      disabilities,
      age0To3,
      preK,
      elementarySchool,
      middleSchool,
      highSchool,
      eighteenPlus,
      adult,
    } = req.query;
    // parse query param to json
    const disabilitiesArr = JSON.parse(disabilities);
    const tasks = await sTask.find({
      // should any matches with the user's disabilties
      disabilities: { $in: disabilitiesArr },
      age0To3: age0To3,
      preK: preK,
      elementarySchool: elementarySchool,
      middleSchool: middleSchool,
      highSchool: highSchool,
      eighteenPlus: eighteenPlus,
      adult: adult,
    });
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

//create a task
exports.addSTask = async (req, res) => {
  try {
    const newTask = await sTask.create(req.body);
    await newTask.save();
    return res.status(200).json(newTask);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
};

exports.getUpcomingTasks = async (req, res) => {};

exports.loadRoadmapCSV = async (req, res) => {
  // if (!req.files) return res.status(400).send("No files were uploaded.");

  console.log(req.body);

  try {
    csv
      .fromString(roadmapFile.data.toString(), {
        headers: true,
        ignoreEmpty: true,
      })
      .on("data", function (data) {
        data["_id"] = new mongoose.Types.ObjectId();

        console.log(data);
      })
      .on("end", function () {
        // Author.create(authors, function (err, documents) {
        //   if (err) throw err;
        // }
        // );

        res.send(" authors have been successfully uploaded.");
      });
  } catch (e) {}
};
