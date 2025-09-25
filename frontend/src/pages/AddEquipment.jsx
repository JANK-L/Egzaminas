import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import API_URL from "../config";

const AddEquipment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipmentData = {
      title,
      description,
      price: price,
    };
    const response = await fetch(API_URL + "/api/equipment/add", {
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

        <button>ADD EQUIPMENT</button>
      </form>
    </div>
  );
};

export default AddEquipment;
