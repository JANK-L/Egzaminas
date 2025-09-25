import { useEffect, useState } from "react";
import Items from "../components/item";

const Home = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/equipment/list",
          {
            headers: {
              credentials: "include",
            },
          }
        );

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
  }, []);

  return (
    <div>
      <div className="item-list">
        {list.map((item) => (
          <Items key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default Home;
