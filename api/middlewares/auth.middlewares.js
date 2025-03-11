const User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.json({ code: 401, message: "Chưa đăng nhập" });
    }
    const user = await User.findOne({
      sessionToken: token,
      deleted: false,
    }).select("-password -sessionToken");
    if (!user) {
      res.json({
        code: 400,
        message: "Token không hợp lệ",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      message: "Token không hợp lệ hoặc đã hết hạn",
      code: 500,
    });
  }
};
