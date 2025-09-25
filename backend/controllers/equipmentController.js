import Equipment from "../models/equipmentModel.js";

export const getList = async (req, res) => {
  res.status(200).json({ msg: "eqp list" });
};

export const getOneItem = async (req, res) => {
  res.status(200).json({ msg: "eqp one item" });
};

export const postItem = async (req, res) => {
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
