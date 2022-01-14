import Sequelize from "sequelize";
import User from "./User";

const database = "auth-assignments";
const username = "postgres";
const password = "password";
const host = "localhost";
const port = 8000;
const dialect = "postgres";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);

export default db;
