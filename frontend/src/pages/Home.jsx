import { useEffect, useState } from "react";
import Items from "../components/item";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const [list, setList] = useState([]);
  const location = useLocation().pathname;
  const url =
    API_URL +
    "/api/equipment/list" +
    (location === "/Equipment/edit" ? "/all" : "");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.message || "Failed to fetch equipment list");
        }

        setList(json.list);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchList();
  }, [url, user]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Equipment</h2>
      <div className="item-list">
        {list.length > 0
          ? list.map((item) => <Items key={item._id} item={item} />)
          : "No equipment was found."}
      </div>
    </div>
  );
};
export default Home;
