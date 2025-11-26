import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../../store/HotelSlice";
import { bookHotel, fetchRequests } from "../../store/requestSlice";
import BookingCard from "./BookingCard";
import "../style/Booking.css";

const Booking = () => {
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


  return (
    <>
      <div className="user-page container mt-5 pt-3">
        <div className="row  g-3 user-row">


          {requests.map((r) => {
            const hotel = hotels.find((h) => h.name === r.hotelName);

            return (
              <div className="col-lg-4 col-md-6 col-sm-12 user-col" key={r.id}>
                <BookingCard request={{ ...r, img: hotel?.img }} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Booking;
