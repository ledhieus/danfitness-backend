const mongoose = require("mongoose");

const sessionsSchema = new mongoose.Schema(
    {
        programId: { type: String, required: true }, 
        name: {type: String, require: true},
        time: {type: Number, require: true},
        exercises: {type: Number, require: true},
        target: {type: String, require: true},
        deleted: {
          type: Boolean,
          default: false,
        },
    },
    { timestamps: true }
);

const Sessions = mongoose.model("workout_sessions", sessionsSchema, "workout_sessions");
module.exports = Sessions;