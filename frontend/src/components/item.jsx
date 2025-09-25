import { Link, useLocation } from "react-router-dom";

const Items = ({ item }) => {
  const location = useLocation();
  const link =
    location.pathname && location.pathname !== "/"
      ? location.pathname + "/"
      : "/Equipment/";

  return (
    <Link to={link + item._id}>
      <div className="item-card">
        <h3>
          {item.title} <br />
          {(link, item._id)}
        </h3>
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
