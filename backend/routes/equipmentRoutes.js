import express from "express";
import {
  getList,
  getListAll,
  getOneItem,
  postItem,
  updateItem,
} from "../controllers/equipmentController.js";
import { isAdmin, verifyToken } from "../middleware/checkRole.js";

const router = express.Router();

router.post("/add", verifyToken, isAdmin, postItem);
router.put("/update", verifyToken, isAdmin, updateItem);

router.get("/list/all", verifyToken, isAdmin, getListAll);
router.get("/list/:id", getOneItem);

router.get("/list", getList);

export default router;
