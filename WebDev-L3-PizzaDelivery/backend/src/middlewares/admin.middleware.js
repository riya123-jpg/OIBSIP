async function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "admin access reuired",
    });
  }
  next();
}

module.exports = requireAdmin;

