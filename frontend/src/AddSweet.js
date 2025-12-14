import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";

function AddSweet() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const token = localStorage.getItem("token");

  const addSweet = async () => {
    await axios.post(
      "http://localhost:5000/api/sweets",
      { name, category, price, quantity },
      { headers: { Authorization: token } }
    );
    alert("Sweet Added");
  };

  return (
    <>
      <Navbar />
      <h2>Add Sweet</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Category" onChange={e => setCategory(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Quantity" onChange={e => setQuantity(e.target.value)} />
      <button onClick={addSweet}>Add</button>
    </>
  );
}

export default AddSweet;
