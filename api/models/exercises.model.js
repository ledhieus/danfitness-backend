const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sessions",
      required: true,
    },
    exerciseId: { type: String, required: true },
    name: { type: String, required: true },
    image: {
      type: String,
      required: true,
    },
    slug: {type: String, required: true},
    sets: [
      {
        type: { type: String, required: true }, // Loại set (ví dụ: drop set, warm-up)
        weight: { type: Number, required: true }, // Mức tạ
        reps: { type: Number, required: true }, // Số reps
        time: { type: Number, required: true, default: 0 }, // Thời gian (nếu có)
      },
    ],
    target: { type: String, required: true }, // Nhóm cơ tác động
    deleted: { type: Boolean, default: false },
    equipment: { type: String, required: true }, // Dụng cụ sử dụng
  },
  { timestamps: true }
);

const Exercises = mongoose.model("Exercises", exerciseSchema, "exercises");
module.exports = Exercises;
