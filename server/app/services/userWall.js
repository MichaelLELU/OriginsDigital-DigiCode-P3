const { decodeJWT } = require("../helpers/jwtHelper");

const adminWall = async (req, res, next) => {
  try {
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = await decodeJWT(token);

    if (decodedToken.role !== ("user" || "admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = adminWall;
