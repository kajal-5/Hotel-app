import React from "react";
import "../style/CartItemList.css";
import axios from "axios";
import { DB_URL } from "../../firebase";
import { useDispatch } from "react-redux";
import { fetchRequests } from "../../store/requestSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await axios.delete(`${DB_URL}/requests/${item.id}.json`);
    dispatch(fetchRequests());
  };

  return (
    <div className="cart-card">
      <div className="cart-card-left">
        <h3>{item.hotelName}</h3>
        <p>
          <strong>City:</strong> {item.city || "—"}
        </p>
        <p>
          <strong>Pincode:</strong> {item.pincode || "—"}
        </p>
        <p>
          <strong>Date:</strong> {item.date}
        </p>
      </div>

      <div className="cart-card-right">
        <h4>₹{item.price}</h4>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
