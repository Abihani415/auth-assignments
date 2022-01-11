import express from "express";
import authFSRoutes from "./routes/authFS";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/fs/", authFSRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
