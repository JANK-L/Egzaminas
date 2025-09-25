import Equipment from "../models/equipmentModel.js";

export const getList = async (req, res) => {
  try {
    const list = await Equipment.find({ "units.state": "available" });
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
