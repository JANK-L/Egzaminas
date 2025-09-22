import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes.js";

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
      console.log(`Hosting: https://localhost:${process.env.PORT}`);
      console.log("-----");
    });
  })
  .catch((err) => console.log(err));

//Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("-----");
  next();
});

app.use("/api/auth", userRoutes);
