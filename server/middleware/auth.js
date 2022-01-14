import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      req.user = jwt.verify(token, TOKEN_SECRET);
      next();
    } else {
      res.status(401).json({ message: "please provide token" });
    }
  } catch (e) {
    res.status(401).json({ message: "token expired" });
  }
};

export default verifyToken;
