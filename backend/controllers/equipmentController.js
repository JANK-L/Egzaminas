import Equipment from "../models/equipmentModel.js";

export const getList = async (req, res) => {
  try {
    const list = await Equipment.find({ state: "available" });
    if (list) res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
};
export const getListAll = async (req, res) => {
  try {
    const list = await Equipment.find();
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
  const { title, price, description } = req.body;
  try {
    if (!title || !price || !description) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const equipment = await Equipment.create({
      title,
      price,
      description,
    });
    res.status(201).json(equipment);
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateItem = async (req, res) => {
  const { title, price, description, _id, state } = req.body;
  try {
    if (!title || !price || !description || !state) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const equipment = await Equipment.findByIdAndUpdate(
      _id,
      {
        title,
        price,
        description,
        state,
      },
      { new: true } // Return the updated document
    );
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.status(201).json(equipment);
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
