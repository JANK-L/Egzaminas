import { useEffect, useState } from "react";
import Items from "../components/item";
import { useAuthContext } from "../hooks/useAuthContext";
import API_URL from "../config";

const Reservations = () => {
  const [list, setList] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(API_URL + "/api/reservation/list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Failed to fetch reservation list");
        }

        setList(json.list);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (user?.token) {
      fetchList();
    }
  }, [user.token]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>All reservations</h2>
      <div className="item-list">
        {list.length > 0
          ? list.map((item) => <Items key={item._id} item={item} />)
          : "No reservation was found"}
      </div>
    </div>
  );
};
export default Reservations;
