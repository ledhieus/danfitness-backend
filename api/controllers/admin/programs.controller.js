// const paginationHelpers = require("../../../helpers/pagination");
const Programs = require("../../models/program.model")

module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    }
    if (req.query.type) {
      find.type = req.query.type;
    }
    const data = await Programs.find(find)
    res.json({
      code: 200,
      message: "Thành công",
      data: data
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 400,
      message: "Lỗi",
    });
  }
};

module.exports.detail = async (req, res) => {
  try {
    const find = {
      slug: req.params.slug,
      deleted: false,
    };
    const data = await Programs.findOne(find);
    res.json(data);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};
module.exports.detailAdmin = async (req, res) => {
  try {
    const find = {
      _id: req.params.id,
      deleted: false,
    };
    const data = await Programs.findOne(find);
    res.json(data);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};

module.exports.create = async (req, res) => {
  try {
    const newProgram = new Programs(req.body);
    const data = await newProgram.save();
    res.json({
      code: 200,
      message: "Tạo Lịch tập thành công",
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


module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Programs.updateOne({ _id: id }, req.body);
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