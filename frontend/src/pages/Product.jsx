import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DateSelector from "../components/DateSelector";
import { useAuthContext } from "../hooks/useAuthContext";

const Product = () => {
  const { user } = useAuthContext();
  const id = useLocation().pathname.split("/")[2];
  const [product, setProduct] = useState({});

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/equipment/list/" + id,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              credentials: "include",
            },
          }
        );

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Failed to fetch equipment list");
        }

        setProduct(json.item);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProduct();
  }, [id, user]);

  const getTotalDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const timeDiff = endDate.getTime() - startDate.getTime();

    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return dayDiff + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:4000/api/reservation/add/" + id,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipment_id: id,
          timeFrom: startDate,
          timeTo: endDate,
          price: getTotalDays(startDate, endDate) * product.price,
        }),
        credentials: "include",
      }
    );

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }

    if (response.ok) {
      console.log("reserved");
    }
  };
  return (
    <div className="Product">
      <h3>{product.title}</h3>
      <p>
        Description: <br />
        {product.description}
      </p>
      <p>Price: {product.price} &euro;/day</p>

      {user ? (
        <>
          <DateSelector
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            id={id}
          />
          {startDate && endDate ? (
            <p>
              Total price: {getTotalDays(startDate, endDate) * product.price}{" "}
              &euro;
            </p>
          ) : (
            <></>
          )}
          <button onClick={handleSubmit}>Rent</button>
        </>
      ) : (
        <Link to="/login">
          <p className="needLogin">Login to rent equipment</p>
        </Link>
      )}
    </div>
  );
};

export default Product;
