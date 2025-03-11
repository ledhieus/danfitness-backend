const Exercises = require("../../models/exercises.model")

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
