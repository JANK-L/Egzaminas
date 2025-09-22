import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.status(200).json({ msg: "Login" });
});

router.post("/signup", (req, res) => {
  res.status(200).json({ msg: "Signup" });
});

export default router;
