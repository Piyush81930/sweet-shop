import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location = "/";
    axios.get("http://localhost:5000/api/sweets", {
      headers: { Authorization: token }
    }).then(res => setSweets(res.data));
  }, []);

  const purchase = async (id) => {
    await axios.post(
      `http://localhost:5000/api/sweets/${id}/purchase`,
      {},
      { headers: { Authorization: token } }
    );
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2>Available Sweets</h2>

        {sweets.map(s => (
          <div className="card" key={s.id}>
            <div>
              <b>{s.name}</b><br />
              ₹{s.price} | Qty: {s.quantity}
            </div>
            <button
              disabled={s.quantity === 0}
              onClick={() => purchase(s.id)}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
