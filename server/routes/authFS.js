import express from "express";
import login, { signup, usersList } from "../controller/authFS";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/users", verifyToken, usersList);

export default router;
