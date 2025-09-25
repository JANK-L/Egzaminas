//import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Items = ({ item }) => {
  return (
    <Link to={"equipment/" + item._id}>
      <div className="item-card">
        <h3>{item.title}</h3>
        <p>Price: {item.price} &euro;/day</p>
        <p>
          Available units:{" "}
          {item.units.filter((unit) => unit.state === "available").length}
        </p>
      </div>
    </Link>
  );
};

export default Items;
