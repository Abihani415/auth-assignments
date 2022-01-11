import { readFile, writeFile } from "fs/promises";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import bcrypt from "bcryptjs";
import path from "path";
import jwt from "jsonwebtoken";
import { PWD_SALT, TOKEN_SECRET } from "../constants";

const authFilePath = path.resolve(__dirname, "../assets/auth.csv");

const getUsers = async () => {
  const fileContent = await readFile(authFilePath);
  const users = parse(fileContent, { columns: true });
  return users;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await getUsers();
  const getUser = users.filter(
    (user) =>
      user.email === email.toLowerCase() &&
      bcrypt.compareSync(password, user.password)
  );
  if (getUser.length > 0) {
    const user = getUser[0];
    user.token = jwt.sign(user, TOKEN_SECRET);
    res.json({ message: "success", user });
  } else {
    res.status(400).json({ message: "incorrect credentials" });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  let users = await getUsers();
  const checkValidUser = users.every((user) => user.email !== email);
  if (checkValidUser) {
    const salt = bcrypt.genSaltSync(PWD_SALT);
    const hash = bcrypt.hashSync(password, salt);
    users.push({
      email: email.toLowerCase(),
      password: hash,
    });
    users = stringify(users, {
      header: true,
    });
    await writeFile(authFilePath, users);
    res.json({ message: "user registered successfully" });
  } else {
    res.status(400).json({ message: "user already exists" });
  }
};

const usersList = async (req, res) => {
  const users = await getUsers();
  res.json({ message: "users found successfully", users });
};

export { signup, usersList };
export default login;
