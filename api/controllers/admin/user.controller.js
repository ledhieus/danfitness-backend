const User = require("../../models/user.model");
const md5 = require("md5");
const generateHelper = require("../../../helpers/generate");
module.exports.create = async (req, res) => {
  try {
    if (req.body.password.length < 8) {
      return res.json({
        message: "Mật khẩu phải có ít nhất 8 ký tự!",
        code: 400,
      });
    }
    req.body.password = md5(req.body.password);
    const exitsEmail = await User.findOne({
      email: req.body.email,
      deleted: false,
    });
    if (exitsEmail) {
      res.json({
        code: 400,
        message: "Email đã tồn tại",
      });
    } else {
      const user = new User({
        name: req.body.name,
        permission: req.body.permission,
        email: req.body.email,
        password: req.body.password,
        token: generateHelper.generateRandomString(30),
      });

      user.save();

      res.json({
        code: 200,
        message: "Tạo tài khoản thành công!",
      });
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi",
    });
  }
};

module.exports.index = async (req, res) => {
  try {
    // const find = {
    //   deleted: false,
    // };
    const data = await User.find();
    res.json({
      code: 200,
      message: "Thành công",
      data: data,
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
      _id: req.params.id,
    };
    const data = await User.findOne(find);
    res.json(data);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await User.updateOne({ _id: id }, req.body);
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

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await User.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() });
    const data = await User.find();
    res.json({
      code: 200,
      message: "Xóa thành công",
      data: data
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};
