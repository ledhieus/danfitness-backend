const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const exerciseListSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    target: { type: String, default: "" }, // Nhóm cơ tác động
    mainMuscle: {type: String, required: true  },
    deleted: { type: Boolean, default: false },
    equipment: { type: String, required: true },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  { timestamps: true }
);

const ExercisesList = mongoose.model("Exercises-list", exerciseListSchema, "exercise-list");
module.exports = ExercisesList;
