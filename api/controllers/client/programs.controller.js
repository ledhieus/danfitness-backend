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
    if (req.query.location) {
      find.location = req.query.location;
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

module.exports.detailProgramPrivate = async (req, res) => {
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
