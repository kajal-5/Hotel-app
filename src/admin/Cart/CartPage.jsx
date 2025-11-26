import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests } from "../../store/requestSlice";
import CartList from "./CartList";
import "../style/CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((s) => s.requests);

  const approved = requests.filter((r) => r.status === "approved");

 
  const totalAmount = useMemo(() => {
    return approved.reduce((sum, r) => sum + Number(r.price || 0), 0);
  }, [approved]);

  useEffect(() => {
    dispatch(fetchRequests());

    const int = setInterval(() => {
      dispatch(fetchRequests());
    }, 3000);

    return () => clearInterval(int);
  }, [dispatch]);
  return (
      <>
        <div className="cart-container">
        {approved.map((item) => (
          <CartList key={item.id} item={item} />
        ))}

        {approved.length > 0 && (
          <div className="cart-total">Total Price: ₹{totalAmount}</div>
        )}
      </div>
    </>
  );
};

export default CartPage;
