import express from "express";
import jwt from "jsonwebtoken";
import login, { signup, usersList } from "../controller/authFS";
import { TOKEN_SECRET } from "../constants";

const router = express.Router();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      req.token = jwt.verify(token, TOKEN_SECRET);
      next();
    } else {
      res.status(401).json({ message: "please provide token" });
    }
  } catch (e) {
    res.status(401).json({ message: "token expired" });
  }
};
router.post("/login", login);
router.post("/signup", signup);
router.get("/users", verifyToken, usersList);

export default router;
