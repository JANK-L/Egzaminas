import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

import equipmentRoutes from "./routes/equipmentRoutes.js";

dotenv.config();

const server = express();

//Conection to DB
mongoose
  .connect(process.env.URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("-----");
      console.log("Connected to DB.");
      console.log(`Listening on port ${process.env.PORT}.`);
      console.log(`Hosting: http://localhost:${process.env.PORT}`);
      console.log("-----");
    });
  })
  .catch((err) => console.log(err));

//Middleware
server.use(express.json());
server.use(cors({ origin: "http://localhost:3001", credentials: true }));
server.use((req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body: ", req.body);
  console.log("-----");
  next();
});

server.use("/api/auth", userRoutes);
server.use("/api/equipment", equipmentRoutes);
server.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
