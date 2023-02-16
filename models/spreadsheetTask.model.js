const mongoose = require("mongoose");

const sTaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    disabilities: {
      type: [String],
      default: [],
    },
    age0To3: {
      type: Boolean,
    },
    preK: {
      type: Boolean,
    },
    elementarySchool: {
      type: Boolean,
    },
    middleSchool: {
      type: Boolean,
    },
    highSchool: {
      type: Boolean,
    },
    eighteenPlus: {
      type: Boolean,
    },
    adult: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const sTask = mongoose.model("sTask", sTaskSchema);
module.exports = sTask;
