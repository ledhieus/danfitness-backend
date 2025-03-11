const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const programsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    durationWeeks: { type: Number, required: true }, 
    sessionsPerWeek: { type: Number, required: true }, 
    expireAt: { type: Date, expires: 0 },
    deleted: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    level: {
      type: String,
      default: "beginner",
      required: true,
    },
    type: {
      type: String,
      default: "public",
    },
    status: {
      type: String,
      default: "active",
    },
    location: {
      type: String,
      default: "home",
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Programs = mongoose.model("Programs", programsSchema, "programs");

module.exports = Programs;
