const User = require("../models/user.model");
const Sessions = require("../models/workout-session.model");
const Program = require("../models/program.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = await Sessions.findOne({ _id: id, deleted: false });

    if (!session) {
      return res
        .status(404)
        .json({ code: 404, message: "Buổi tập không tồn tại" });
    }

    const program = await Program.findOne({
      _id: session.programId,
      deleted: false,
    });

    if (!program) {
      return res
        .status(404)
        .json({ code: 404, message: "Lịch tập không tồn tại" });
    }

    // Nếu lịch tập là public => Cho phép truy cập
    if (program.type === "public") {
      return next();
    }

    // Nếu lịch tập là private => Kiểm tra đăng nhập
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.status(401).json({ code: 401, message: "Chưa đăng nhập" });
    }

    const user = await User.findOne({
      sessionToken: token,
      deleted: false,
    }).select("-password -sessionToken");

    if(user.permission !== program._id.toString()){
      return res.status(401).json({ code: 401, message: "Chưa đăng nhập" });
    }

    if (!user) {
      return res
        .status(403)
        .json({ code: 403, message: "Token không hợp lệ hoặc hết hạn" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    return res.status(500).json({ code: 500, message: "Lỗi server" });
  }
};
