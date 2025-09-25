import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const EditEquipment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [units, setUnits] = useState(0);

  const id = useLocation().pathname.split("/")[3];

  const { user } = useAuthContext();
  const navigate = useNavigate();

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
      _id: id,
    };
    console.log(equipmentData);
    const response = await fetch(
      "http://localhost:4000/api/equipment/update/",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipmentData),
        credentials: "include",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      navigate("/Equipment/edit");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/equipment/list/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // move this outside headers
          }
        );

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Failed to fetch equipment");
        }

        setTitle(json.item.title);
        setDescription(json.item.description);
        setPrice(json.item.price);
        setUnits(json.item.units.length);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="equipmentform">
      <form onSubmit={handleSubmit}>
        <h2>EDIT EQUIPMENT</h2>
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

        <button>SUBMIT CHANGES</button>
      </form>
    </div>
  );
};

export default EditEquipment;
