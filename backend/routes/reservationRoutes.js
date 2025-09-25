import express from "express";
import {
  getList,
  getOneItem,
  getUserList,
  postItem,
  updateItem,
} from "../controllers/reservationController.js";

import { isAdmin, isUser, verifyToken } from "../middleware/checkRole.js";

const router = express.Router();

router.post("/add/:id", verifyToken, isUser, postItem);
router.put("/update/:id", updateItem);

router.get("/user", verifyToken, isUser, getUserList);

router.get("/list/:id", getOneItem);

router.get("/list", verifyToken, isAdmin, getList);

export default router;
