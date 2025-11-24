import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../store/HotelSlice";
import { bookHotel, fetchRequests } from "../store/requestSlice";
import UserCard from "./UserCard";
import "./style/UserPage.css";

const UserPage = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector((s) => s.hotel);
  const { requests } = useSelector((s) => s.requests);
  const user = useSelector((s) => s.auth.user);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    dispatch(fetchHotels());
    dispatch(fetchRequests());
    const int = setInterval(() => {
      dispatch(fetchHotels());
      dispatch(fetchRequests());
    }, 3000);
    return () => clearInterval(int);
  }, [dispatch]);

  const handleBook = (hotel) => {
    const qty = selected[hotel.id]?.qty || 1;
    const date = selected[hotel.id]?.date;
    
    if (!user) return alert("Please login to book");
    if (!date && hotel.availablePeople !== null && qty < hotel.availablePeople) return alert("Please select a booking date");
    if (hotel.availablePeople != null && qty > hotel.availablePeople)
      return alert("Not enough availability");
    
    dispatch(
      bookHotel({
        hotelName: hotel.name,
        userEmail: user.email,
        people: qty,
        date,
        price: hotel.price, // ← save hotel price
      })
    )
      .unwrap()
      .then(() => alert("Booking request sent"))
      .catch((err) => alert("Error: " + (err || "Failed")));
  };

  const myRequests = requests.filter((r) => r.userEmail === user?.email);

  return (
    <>
      <div className="user-page container mt-5 pt-3">
        <div className="row  g-3 user-row">
          {hotels.map((h) => (
            <div className="col-lg-4 col-md-6 col-sm-12 user-col" key={h.id}>
              <UserCard
                hotel={h}
                selected={selected}
                setSelected={setSelected}
                handleBook={handleBook}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
