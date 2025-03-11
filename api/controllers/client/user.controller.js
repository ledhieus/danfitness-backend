const User = require("../../models/user.model");
const md5 = require("md5");
const generateHelper = require("../../../helpers/generate");
module.exports.detail = async (req, res) => {
  try {
    const find = {
      _id: req.params.id,
    };
    const data = await User.findOne(find).select("-password");
    res.json(data);
  } catch (error) {
    res.json("Không tìm thấy");
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, deleted: false });

    if (!user) {
      return res.json({ code: 400, message: "Email không tồn tại" });
    }

    if (md5(password) !== user.password) {
      return res.json({ code: 400, message: "Sai mật khẩu" });
    }

    // Tạo sessionToken mới (để hạn chế đăng nhập 1 thiết bị)
    const sessionToken = generateHelper.generateRandomString(30);

    // Lưu sessionToken vào database
    user.sessionToken = sessionToken;
    await user.save();

    // Gửi sessionToken về client bằng cookie HTTP-only
    res.cookie("sessionToken", sessionToken, {
      httpOnly: true,
      secure: true, // Đảm bảo chỉ gửi cookie qua HTTPS
      sameSite: "Strict",
    });

    res.json({ code: 200, message: "Đăng nhập thành công!" });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.json({ code: 500, message: "Lỗi máy chủ" });
  }
};

module.exports.getMe = async (req, res) => {
  try {
    res.json({
      code: 200,
      message: "Lấy thông tin thành công",
      user: req.user,
    });
  } catch (error) {
    res.json({ code: 400, message: "Lỗi server" });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("sessionToken", {
    path: "/",
    httpOnly: true,
    secure: true, // Chỉ hoạt động trên HTTPS
    sameSite: "strict", // Chặn gửi cookie từ domain khác
  });
  res.json({ code: 200, message: "Đã đăng xuất" });
};

module.exports.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ code: 404, message: "Người dùng không tồn tại" });
    }

    if (md5(oldPassword) !== user.password) {
      return res.status(400).json({ code: 400, message: "Sai mật khẩu" });
    }

    if (!newPassword || md5(newPassword) === user.password) {
      return res.status(400).json({ code: 400, message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ" });
    }

    await User.updateOne(
      { _id: userId },
      { password: md5(newPassword) }
    );

    res.clearCookie("sessionToken");

    return res.status(200).json({
      code: 200,
      message: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
    });

  } catch (error) {
    console.error("Lỗi đổi mật khẩu:", error);
    return res.status(500).json({ code: 500, message: "Lỗi server" });
  }
};
