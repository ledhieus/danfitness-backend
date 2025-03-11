const ExercisesList = require("../../models/exercise-list.model")

module.exports.create = async (req, res) => {
  try {
    const newExercises = new ExercisesList(req.body);
    const data = await newExercises.save();
    res.json({
      code: 200,
      message: "Tạo bài tập thành công",
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
    const find = {
      deleted: false
    }
    if(req.query.mainMuscle){
      find.mainMuscle = req.query.mainMuscle
    }
    const data = await ExercisesList.find(find)
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
    const exercisesList = await ExercisesList.findOne(find);
    res.json(exercisesList);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};

module.exports.detailImage = async (req, res) => {
  try {
    const find = {
      image: req.params.image,
      deleted: false,
    };
    const exercisesList = await ExercisesList.findOne(find);
    res.json(exercisesList);
  } catch (error) {
    res.json("Không tìm thấy");
  }
}

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await ExercisesList.updateOne({ _id: id }, req.body);
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