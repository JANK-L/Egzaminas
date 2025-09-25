import express from "express";
import {
  getList,
  getOneItem,
  postItem,
} from "../controllers/equipmentController.js";

const router = express.Router();

router.post("/add", postItem);

router.get("/list/:id", getList);

router.get("/list", getOneItem);

export default router;
