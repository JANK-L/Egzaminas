import Reservation from "../models/reservationModel.js";
import Equipment from "../models/equipmentModel.js";
import jwt from "jsonwebtoken";

export const getList = async (req, res) => {
  try {
    const list = await Reservation.find();
    if (list) res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
};

export const getOneItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Equipment.findById(id);
    if (item) res.status(200).json({ item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
};

export const postItem = async (req, res) => {
  const { equipment_id, timeFrom, timeTo, price } = req.body;
  const authHeader = req.headers.authorization;
  const decoded = jwt.verify(authHeader.split(" ")[1], process.env.SECRET);

  try {
    if (!equipment_id || !timeFrom || !timeTo) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const reservation = await Reservation.create({
      user_id: decoded._id,
      equipment_id,
      timeFrom,
      timeTo,
      price,
    });
    if (reservation) {
      const equipment = await Equipment.findByIdAndUpdate(
        { _id: equipment_id },
        {
          state: "rented",
        },
        { new: true }
      );
      res.status(201).json(reservation);
    }
  } catch (error) {
    console.error("Error adding reservation:", error);
    res.status(500).json({ message: "Server error h" });
  }
};

export const updateItem = async (req, res) => {
  const { title, price, units, description } = req.body;
  try {
    if (!title || !price || !units || !description) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const equipment = await Equipment.create({
      title,
      price,
      units,
      description,
    });
    res.status(201).json(equipment);
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
