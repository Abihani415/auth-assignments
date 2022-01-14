import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PWD_SALT, TOKEN_SECRET } from "../constants";
import db from "../models";

const User = db.user;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, TOKEN_SECRET);
    res.json({ message: "success", user, token });
  } else {
    res.status(400).json({ message: "incorrect credentials" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ where: { email } });
  if (user) {
    res.status(400).json({ message: "user already exists" });
  } else {
    const salt = bcrypt.genSaltSync(PWD_SALT);
    const hash = bcrypt.hashSync(password, salt);
    user = await User.create({
      email: email.toLowerCase(),
      password: hash,
    });
    res.json({ message: "user registered successfully" });
  }
};

const usersList = async (req, res) => {
  const users = await User.findAll();
  res.json({ message: "users found successfully", users });
};

export default login;
export { signup, usersList };
