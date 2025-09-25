import express from "express";
import {
  getList,
  getOneItem,
  postItem,
} from "../controllers/reservationController.js";

import { isAdmin, verifyToken } from "../middleware/checkRole.js";

const router = express.Router();

router.post("/add/:id", postItem);
router.post("/update/:id", postItem);

router.get("/list/:id", getOneItem);

router.get("/list", verifyToken, isAdmin, getList);

export default router;
