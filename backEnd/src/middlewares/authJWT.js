const jwt = require("jsonwebtoken");
const JWT_SIGN_IN = process.env.JWT_SIGN_IN;

// autorizacion JWT

const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "access denied, Token not provided" });
  }

  const payload = jwt.verify(token, JWT_SIGN_IN);
  // validar tiempo en que expira el token
  if (Date.now() / 1000 > payload.exp) {
    return res.status(401).send({ error: "token expired" });
  }

  req.userData = {
    role: payload?.role,
  };
  next();
};

module.exports = {
  verifyToken,
};
