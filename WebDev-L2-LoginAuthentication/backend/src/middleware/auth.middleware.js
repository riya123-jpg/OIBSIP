async function identityUser(req, res, next) {
  const id = req.session.userId;
  console.log("ME USER ID:", req.session.userId);
  if (!id) {
    return res.status(401).json({
      message: "unauthorized user",
    });
  }
  next();
}

module.exports = identityUser;
