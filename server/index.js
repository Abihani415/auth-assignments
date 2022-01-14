import express from "express";
import authFSRoutes from "./routes/authFS";
import authRoutes from "./routes/auth";
// import db from './models';

const app = express();

// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("DB droppeed and resynced.");
// });
app.use(express.static("public"));
app.use(express.json());
app.use("/fs/", authFSRoutes);
app.use("/api/", authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
