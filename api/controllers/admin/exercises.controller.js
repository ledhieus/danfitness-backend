const Exercises = require("../../models/exercises.model")

module.exports.create = async (req, res) => {
  try {
    const newExercises = new Exercises(req.body);
    const data = await newExercises.save();
    res.json({
      code: 200,
      message: "Tạo buổi tập thành công",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi", error)
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

module.exports.index = async (req, res) => {
  try {
    const id = req.params.id
    const find = {
      sessionId: id,
      deleted: false
    }
    const data = await Exercises.find(find)
    res.json({
      code: 200,
      message: "Thành công",
      data: data,
    });
  } catch (error) {
    console.error("Lỗi", error)
    res.json({
      code: 400,
      message: "Lỗi!"+ error.message,
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const find = {
      _id: req.params.id,
      deleted: false,
    };
    const data = await Exercises.findOne(find);
    res.json(data);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Exercises.updateOne({ _id: id }, req.body);
    res.json({
      code: 200,
      message: "Cập nhật thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};