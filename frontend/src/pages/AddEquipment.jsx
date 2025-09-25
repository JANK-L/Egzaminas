import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const AddEquipment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [units, setUnits] = useState(0);

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const unitArray = Array.from({ length: units }, () => ({
      state: "available",
    }));

    const equipmentData = {
      title,
      description,
      price: price,
      units: unitArray,
    };
    const response = await fetch("http://localhost:4000/api/equipment/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipmentData),
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      setDescription("");
      setTitle("");
      setPrice(0);
      setUnits(0);
      console.log("added");
    }
  };

  return (
    <div className="equipmentform">
      <form onSubmit={handleSubmit}>
        <h2>ADD EQUIPMENT</h2>
        <label>EQUIPMENT TITLE</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label>DESCRIPTION</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        ></textarea>

        <label>PRICE PER DAY</label>
        <input
          type="Number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />

        <label>UNITS</label>
        <input
          type="Number"
          onChange={(e) => setUnits(e.target.value)}
          value={units}
          required
        />

        <button>ADD EQUIPMENT</button>
      </form>
    </div>
  );
};

export default AddEquipment;
